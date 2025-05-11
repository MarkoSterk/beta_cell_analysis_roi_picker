"""
Functions for handling lif file
"""
#pylint: disable=E1101
import os
import gc

#import cv2 #type: ignore
from readlif.reader import LifFile, LifImage
import torch
import numpy as np
from torchvision.transforms import PILToTensor
import imageio as iio

from backend.utilities.utils import get_device
from backend.configs import Config


def create_frames_array(lif: LifFile, islet) -> torch.Tensor:
    """
    Creates a 3D/4D array from frames of video
    """
    islet.change_process_status({
        "message": "Parsing LIF file for time series data"
    })
    image_series: LifImage | None = None
    for lif_img in lif.get_iter_image():
        if lif_img.dims.t > 1:
            image_series = lif_img
            break
    if image_series is None:
        return False
    islet.change_process_status({
        "message": "Time series data found. Constructing video frames."
    })
    meta_data = image_series.info['dims']
    width, height, frames = meta_data.x, meta_data.y, meta_data.t
    torch_array = torch.empty(frames, height, width, dtype=torch.uint8)
    transform = PILToTensor()

    for index, frame in enumerate(image_series.get_iter_t(z=0, c=0)):
        torch_array[index,:,:] = transform(frame)
        if index%100 == 0:
            islet.change_process_status({
                "perc": round((index/frames)*100.0, 2)
            })

    torch_array = torch_array.to(get_device())
    islet.change_process_status({
        "message": "Video frames created"
    })
    gc.collect()
    return torch_array

def frames_to_video(data: torch.Tensor, islet):
    """
    Creates .avi video from sequence of images from LIF file
    """
    islet.delete_video_and_avg_frame()
    fps: int = 24
    frames, height, width = data.size()

    app_path: str = getattr(Config, "APP_PATH")
    video_name: str = getattr(Config, "LIF_VIDEO")
    video_hash: str = islet.create_video_hash()
    islet.set_video_hash(video_hash)
    video_name = video_name.replace("%", video_hash)
    avg_frame_name: str = getattr(Config, "AVG_FRAME")
    output_path: str = os.path.join(app_path, "static", video_name)
    avg_frame_path: str = os.path.join(app_path, "static", avg_frame_name)
    islet.change_process_status({
        "perc": 0,
        "message": "Constructing video."
    })
    # Ensure output folder exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # move data to cpu if on gpu/cuda
    data = data.detach().cpu()
    # Create video writer with correct codec and pixel format
    writer = iio.get_writer(
        output_path,
        fps=fps,
        codec='libx264',
        format='mp4',
        pixelformat='yuv420p'
    )
    avg_frame: np.ndarray = np.zeros((height, width), float)
    for i in range(frames):
        frame = data[i].numpy()  # (height, width)
        avg_frame+=frame
        if frame.ndim == 2:
            # Expand grayscale frame to 3 channels (RGB)
            frame = np.stack([frame]*3, axis=-1)  # shape (height, width, 3)

        writer.append_data(frame)
        if i % 100 == 0:
            islet.change_process_status({
                "perc": round((i/frames)*100.0, 2),
            })

    writer.close()
    avg_frame = avg_frame / frames
    avg_frame = np.rint(avg_frame)
    avg_frame = np.clip(avg_frame, 0, 255)
    avg_frame = avg_frame.astype(np.uint8)
    iio.imsave(avg_frame_path, avg_frame)

def get_avg_frame_url():
    """
    Returns url for avg frame of video
    """
    protocol = getattr(Config, "PROTOCOL")
    host = getattr(Config, "HOST")
    port = getattr(Config, "PORT")
    frame: str = getattr(Config, "AVG_FRAME")
    url = f"{protocol}://{host}:{port}/static/{frame}"
    return url

def clean_temp_files():
    """
    Cleans all temporary files of the app
    """
    app_base_path = getattr(Config, "APP_PATH")
    roi_video_path = os.path.join(app_base_path, 'static', 'roi_video.mp4')
    if os.path.exists(roi_video_path):
        os.remove(roi_video_path)
