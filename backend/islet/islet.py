"""
Islet (of Langerhans) class which holds data and methods for
the current project
"""
from io import BufferedReader
import os
import gc
from pathlib import Path
import pickle
import uuid

from loguru import logger
import torch
import numpy as np
from pyjolt import PyJolt

from backend.api.preferences.schemas import PreferencesSchema
from backend.utilities import singleton
from backend.utilities.utils import get_device, delete_file
from backend.configs import Config
from .types import ResponseDict

def get_ellipse_mask(roi_data: dict[str, int],
                     width: int, height: int,
                     width_factor: float,
                     height_factor: float) -> tuple[torch.Tensor, float, float]:
    """
    Creates tensor mask for ellipse ROI
    """
    ##Converts ROI PICKER pixel coordinates into actuall coordinates
    ##based on the size of the images
    start_x, end_x = roi_data['startX']/width_factor, roi_data['endX']/width_factor
    start_y, end_y = roi_data['startY']/height_factor, roi_data['endY']/height_factor

    cx, cy = (start_x + end_x)/2, (start_y + end_y)/2
    a, b = abs(end_x-start_x)/2, abs(end_y-start_y)/2
    mesh_y, mesh_x = torch.meshgrid(torch.arange(height), torch.arange(width), indexing='ij')
    mask = ((mesh_x - cx)**2 / a**2) + ((mesh_y - cy)**2 / b**2) <= 1

    return mask, round(cx), round(cy)

@singleton
class Islet:
    """
    Islet class
    """

    def __init__(self, app: PyJolt|None = None):
        """
        Initilizer for Islet class
        """
        self._app: PyJolt
        self.liff_array: torch.Tensor|None = None
        self.quick_notes: dict[str, str] = {}
        self.preferences: dict = PreferencesSchema().model_dump()
        self.video_url: str|None = None
        self.selected_rois: list[dict[str, torch.Tensor|dict]] = []
        self.raw_number_of_cells: int = 0
        self.raw_time_series: torch.Tensor|None = None
        self.process_status: dict[str, float|bool|str] = {}
        self.video_hash: str|None = None
        if app is not None:
            self.init_app(app)

    def init_app(self, app: PyJolt):
        """
        Initilizer method for factory pattern
        """
        self._app = app

    def reset_islet(self):
        """Resets islet to initial defaults"""
        self.delete_video_and_avg_frame()
        self.liff_array = None
        self.quick_notes = {}
        self.preferences = PreferencesSchema().model_dump()
        self.video_url= None
        self.video_hash = None
        self.selected_rois = []
        self.raw_number_of_cells: int = 0
        self.raw_time_series = None
        self.process_status = {}

    def get_lif_video_url(self):
        """
        Return url for lif video
        """
        protocol = self._app.get_conf("PROTOCOL")
        host = self._app.get_conf("HOST")
        port = self._app.get_conf("PORT")
        video: str = self._app.get_conf("LIF_VIDEO")
        video = video.replace("%", self.video_hash) # type: ignore
        url = f"{protocol}://{host}:{port}/static/{video}"
        return url

    def set_video_hash(self, hash_str: str):
        """Sets the video hash"""
        self.video_hash = hash_str

    def create_video_hash(self) -> str:
        """Creates video hash"""
        return str(uuid.uuid4())

    def find_mp4_files(self) -> list[str]:
        """
        Recursively find all .mp4 files in the given folder.

        :return: A list of full file paths for all .mp4 files found.
        """
        app_path: str = self._app.get_conf("APP_PATH")
        static_folder: str = os.path.join(app_path, "static")
        folder_path = Path(static_folder)
        # Use rglob for recursive search; change to glob('*.mp4') for top-level only
        mp4_files: list[str] = [str(path) for path in folder_path.rglob('*.mp4')]
        return mp4_files

    def delete_video_and_avg_frame(self):
        """
        Deletes video and average frame
        """
        app_path: str = self._app.get_conf("APP_PATH")
        video_paths: list[str] = self.find_mp4_files()
        for path in video_paths:
            delete_file(path)
        img_path: str = os.path.join(app_path, "static", self._app.get_conf("AVG_FRAME"))
        delete_file(img_path)

    def get_preferences(self) -> dict[str, str]:
        """
        Returns preferences
        """
        return self.preferences

    def save_preferences(self, preferences: dict):
        """
        Saves preferences
        """
        self.preferences = preferences

    def project_name(self) -> str:
        """Returns current project name"""
        return self.preferences["project_name"]

    def save_quick_notes(self, notes: dict[str, str]):
        """
        Saves quick notes
        """
        self.quick_notes = notes

    def get_quick_notes(self) -> dict[str, str]:
        """
        Returns quick notes
        """
        return self.quick_notes

    def save_torch_array(self, torch_array: torch.Tensor):
        """
        Adds torch array data to islet
        """
        self.liff_array = torch_array

    def get_torch_array(self) -> torch.Tensor|None:
        """
        Returns torch array
        """
        return self.liff_array

    def remove_torch_array(self):
        """
        Removes torch array
        """
        self.liff_array = None

    def get_state(self) -> dict:
        """
        Gets current state
        """
        return {
            "video": self.video_url,
            "rois": self.selected_rois,
            "quicknotes": self.quick_notes,
            "preferences": self.preferences
        }

    def get_roi_time_series(self, roi_type: str,
        roi_data: dict[str, int]) -> ResponseDict[tuple[torch.Tensor, list[float]]]:
        """
        Gets ROI time series based on roi coordinates
        """
        if self.liff_array is None:
            return {
                "data": None,
                "message": "Failed to get ROI time series",
                "ok": False
            }
        mask_methods = {
            "ellipse": get_ellipse_mask
        }
        frames, height, width = self.liff_array.size()
        width_factor = Config.VIDEO_WIDTH/width
        height_factor = Config.VIDEO_HEIGHT/height
        batch_size = int(np.ceil(frames/Config.ROI_PICKER_BATCHES))
        try:
            mask, pos_x, pos_y = mask_methods[roi_type](roi_data,
                                                        width,
                                                        height,
                                                        width_factor,
                                                        height_factor)
            mask = mask.to(get_device())

            roi_means = []
            for i in range(Config.ROI_PICKER_BATCHES):
                batch_start = int(i * batch_size)
                batch_end = int(min((i+1)*batch_size, frames))
                batch_frames_array = self.liff_array[batch_start:batch_end,:,:]
                roi_means.append(batch_frames_array.float()[:,mask].mean(dim=1))
            gc.collect()
            return {
                    "data": (torch.cat(roi_means, dim=0), [pos_x, pos_y]),
                    "message": "Fetched ROI time series",
                    "ok": True
                }
        #pylint: disable-next=W0718
        except Exception as err:
            logger.debug(f"Failed to get ROI time series: {str(err)}")
            return {
                    "data": None,
                    "message": "Failed to get ROI time series",
                    "ok": False
                }

    def add_selected_roi_data(self, data: dict) -> None:
        """
        Adds selected roi data
        """
        self.selected_rois.append(data)
        self.raw_number_of_cells+=1
        traces: ResponseDict[torch.Tensor] = self.get_all_selected_roi_traces()
        if traces["ok"] is False:
            return
        self.raw_time_series = traces["data"]

    def get_all_selected_roi_traces(self) -> ResponseDict[torch.Tensor]:
        """
        Gets all selected time series
        """
        if len(self.selected_rois) == 0:
            logger.debug("No ROIs were selected.")
            return {
                "data": None,
                "message": "No ROIs were selected.",
                "ok": False
            }
        try:
            traces: torch.Tensor = torch.zeros((len(self.selected_rois[0]["data"]),
                                                len(self.selected_rois)),
                                                dtype=torch.float32)
            for i, roi in enumerate(self.selected_rois):
                if isinstance(roi["data"], list):
                    roi["data"] = torch.Tensor(roi["data"])
                traces[:,i] = roi["data"] # type: ignore
            return {
                "data": traces,
                "message": "ROI data fetched successfully.",
                "ok": True
            }
        #pylint: disable-next=W0718
        except Exception as err:
            logger.debug(f"Failed to get ALL ROI time series: {str(err)}")
            return {
                "data": None,
                "message": "Failed to get ALL ROI time series.",
                "ok": False
            }

    def remove_selected_roi_data(self, index: int) -> None:
        """
        Removes ROI data based on selected index
        """
        if len(self.selected_rois)>index>=0:
            del self.selected_rois[index]
            self.raw_number_of_cells-=1
            self.raw_time_series = self.get_all_selected_roi_traces() # type: ignore

    def get_selected_roi_data(self, index: int) -> dict[str, torch.Tensor|dict] | None:
        """
        Returns selected roi data based on index
        """
        if 0<index<len(self.selected_rois):
            return self.selected_rois[index]
        return None

    def save_as_pickle(self, protocol: int = pickle.HIGHEST_PROTOCOL) -> ResponseDict[bytes]:
        """saves project as pickle"""
        pickle_data: dict = {
            "liff_array": self.liff_array,
            "quick_notes": self.quick_notes,
            "preferences": self.preferences,
            "video_url": self.video_url,
            "selected_rois": self.selected_rois,
            "raw_number_of_cells": self.raw_number_of_cells,
            "raw_time_series": self.raw_time_series
        }
        try:
            return {
                "data": pickle.dumps(pickle_data, protocol=protocol),
                "message": "Data saved successfully.",
                "ok": True
            }
        #pylint: disable-next=W0718
        except Exception as err:
            logger.debug(f"Failed to save data to pickle: {str(err)}")
            return {
                "data": None,
                "message": "Failed to save data.",
                "ok": False
            }

    def load_from_pickle(self, pickle_data: BufferedReader) -> ResponseDict|None:
        """Reads data from pickle object"""
        try:
            data: dict = pickle.loads(pickle_data.read())
            for key, value in data.items():
                setattr(self, key, value)
        #pylint: disable-next=W0718
        except Exception as err:
            logger.debug(f"Failed to load data from pickle: {str(err)}")
            self.reset_islet()
            return {
                "data": None,
                "message": "Failed to load data from pickle file.",
                "ok": False,
            }

    def get_all_time_series(self) -> ResponseDict[np.ndarray]:
        """
        Returns 2D numpy array with all time series
        """
        if self.liff_array is None:
            return {
                "data": None,
                "message": "Coordinates don't exist.",
                "ok": False
            }
        try:
            frames, _, _ = self.liff_array.size()
            cell_num: int = len(self.selected_rois)
            time_series: np.ndarray = np.zeros((frames, cell_num), dtype=np.float16)
            for i, roi in enumerate(self.selected_rois):
                time_series[:,i] = roi["data"].cpu().numpy()
            return {
                "data": time_series,
                "message": "Time series exported successfully.",
                "ok": True,
            }
        #pylint: disable-next=W0718
        except Exception as err:
            logger.debug(f"Failed to get ALL ROI time series: {str(err)}")
            return {
                "data": time_series,
                "message": "Failed to export time series.",
                "ok": False,
            }

    def get_all_coordinates(self) -> ResponseDict[np.ndarray]:
        """
        Returns 2D numpy array with coordinates
        """
        try:
            cell_num: int = len(self.selected_rois)
            pos: np.ndarray = np.zeros((cell_num, 2), dtype=np.float16)
            for i, roi in enumerate(self.selected_rois):
                pos[i,0] = roi["pos"][0] * self.preferences["px_to_um"]
                pos[i,1] = roi["pos"][1] * self.preferences["px_to_um"]
            return {
                "data": pos,
                "message": "Coordinates exported successfully.",
                "ok": True,
            }
        #pylint: disable-next=W0718
        except Exception as err:
            logger.debug(f"Failed to get all coordinates: {str(err)}")
            return {
                "data": None,
                "message": "Failed to export coordinates",
                "ok": False,
            }
    def set_process_status(self, status: dict[str, float|bool|str|dict]):
        """
        Sets new process status
        """
        self.process_status = status # type: ignore

    def get_process_status(self) -> dict[str, float|bool|str]:
        """
        Gets current process status
        """
        return self.process_status

    def change_process_status(self, changes: dict[str, float|bool|str]):
        """
        Changes provided key-value pairs
        """
        for key, value in changes.items():
            self.process_status[key] = value
