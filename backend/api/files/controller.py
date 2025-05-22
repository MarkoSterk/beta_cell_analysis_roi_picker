"""
Files controller 
"""
from concurrent.futures import ThreadPoolExecutor
from typing import Sequence
from pyjolt import Blueprint, Request, Response
import torch
import numpy as np
import webview
from readlif.reader import LifFile
from pyeditorjs import EditorJsParser
from xhtml2pdf import pisa
from loguru import logger

from backend.extensions import islet, desktop
from backend.islet.types import ResponseDict
from backend.utilities.types import StatusResponse
from backend.utilities.utils import abort, success
from .lif_handlers import create_frames_array, frames_to_video

executor = ThreadPoolExecutor(max_workers=4)

files_controller: Blueprint = Blueprint(__name__,
                                        "files",
                                        url_prefix="/api/v1/files")

def process_lif_upload(temp_file: str):
    """
    Processes the lif upload
    """
    try:
        torch_array: torch.Tensor = create_frames_array(LifFile(temp_file), islet)
        if torch_array is False:
            return islet.set_process_status({
                "perc": 100.0,
                "status": "failed",
                "alive": False,
                "finished": True,
                "message": "There is no time series data in the provided LIF file."
            })
        islet.save_torch_array(torch_array)
        frames_to_video(torch_array, islet)
        #delete_file(temp_file)

        islet.video_url = islet.get_lif_video_url()
        return islet.set_process_status({
            "perc": 100.0,
            "status": "finished",
            "alive": True,
            "finished": True,
            "message": "Lif upload finished.",
            "video": islet.video_url,
            "preferences": islet.get_preferences()
        })
    #pylint: disable-next=W0718
    except Exception as err:
        logger.debug(f"Failed to process LIF file: {err}")
        islet.set_process_status({
            "perc": 100.0,
            "status": "failed",
            "alive": False,
            "finished": False,
            "message": "Failed to process LIF file. Please check uploaded data."
        })


@files_controller.get("/progress-check")
async def check_lif_progress(_: Request, res: Response) -> Response:
    """
    Checks and returns current status of LIF processing
    """
    return res.json({
        "status": "success",
        "message": "Progress checked successfully",
        "data": islet.get_process_status()
    })

@desktop.expose
def native_upload_lif_file() -> StatusResponse:
    """Native LIF file upload"""

    result = webview.windows[0].create_file_dialog(
        webview.OPEN_DIALOG,
        file_types=['Lif file (*.lif)']
    )

    if result is None:
        return abort("Action aborted by user", "aborted", True)

    islet.set_process_status({
        "perc": 0,
        "status": "processing",
        "alive": True,
        "finished": False,
        "message": "Processing LIF file."
    })
    executor.submit(process_lif_upload, result[0])

    return success("Process started", data="http://localhost:8080/api/v1/files/progress-check")

@desktop.expose
def native_open_pkl() -> StatusResponse:
    """Opens pkl file natively"""
    result: Sequence[str]|None = desktop.window.create_file_dialog(
            webview.OPEN_DIALOG,
            file_types=['Pickle file (*.pkl)']
    )
    if result is None:
        return abort("Action aborted by user", "aborted", True)
    with open(result[0], "rb") as file:
        islet.load_from_pickle(file)
        torch_array: torch.Tensor|None =  islet.get_torch_array()
        if torch_array is None:
            return abort("Failed to open project from pkl file.")
        frames_to_video(torch_array, islet)
        islet.video_url = islet.get_lif_video_url()
    return success("Project opened successfully.", data=islet.video_url)

def create_pdf_markup(html: str, project_name: str) -> str:
    """
    Creates pdf markup with styling
    """
    CUSTOM_CSS: str = """
        /* page box + margin */
        @page {
            size: A4;
            margin: 1in;
        }
        /* reset body */
        body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
            line-height: 1.4;
        }
        /* kill Editor.js block spacing */
        .ce-block,
        .cdx-block,
        .ce-block__content {
            margin: 0 !important;
            padding: 0 !important;
        }
        /* now small spacing for headings/paras/lists */
        h1, h2, h3, h4, h5, h6 {
            margin: 0.2em 0 !important;
        }
        p {
            margin: 0.1em 0 !important;
        }
    """
    full_html = f"""<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>{project_name} quicknotes</title>
                <style>
                    {CUSTOM_CSS}
                </style>
            </head>
            <body>
                {html}
            </body>
        </html>"""
    return full_html

@desktop.expose
def native_export_coordinates() -> StatusResponse:
    """Export of coordinates with native file dialog"""
    project_name: str = islet.project_name()
    filename: str = f"coordinates_{project_name}.txt"
    result: Sequence[str]|None = desktop.window.create_file_dialog(
            webview.SAVE_DIALOG,
            save_filename=filename,
            file_types=['Text file (*.txt)']
    )
    if result is None:
        return abort("Action aborted by user", "aborted", True)
    arr = islet.get_all_coordinates()
    if arr["data"] is None:
        return abort(arr["message"])
    np.savetxt(str(result), arr["data"], fmt="%.2lf")
    return success("Coordinates saved.")

@desktop.expose
def native_export_timeseries() -> StatusResponse:
    """Export of coordinates with native file dialog"""
    project_name: str = islet.project_name()
    filename: str = f"time_series_{project_name}.txt"
    result: Sequence[str]|None = desktop.window.create_file_dialog(
            webview.SAVE_DIALOG,
            save_filename=filename,
            file_types=['Text file (*.txt)']
    )
    if result is None:
        return abort("Action aborted by user", "aborted", True)
    arr: ResponseDict[np.ndarray] = islet.get_all_time_series()
    if arr["data"] is not None:
        np.savetxt(str(result), arr["data"], fmt="%.5lf")
        return success("Timeseries saved.")
    return abort(arr["message"])

@desktop.expose
def native_export_quicknotes() -> StatusResponse:
    """Exports quicknotes as PDF using a native file dialog"""

    quicknotes: dict = islet.get_quick_notes()
    parser = EditorJsParser(quicknotes)
    html = parser.html(sanitize=True)
    project_name: str = islet.project_name()
    full_html: str = create_pdf_markup(html, project_name)

    # Open native save dialog
    result: Sequence[str]|None = webview.windows[0].create_file_dialog(
        webview.SAVE_DIALOG,
        save_filename=f"quicknotes_{project_name}.pdf",
        file_types=['PDF file (*.pdf)']
    )

    if result is None:
        return abort("Action aborted by user", "aborted", True)

    # Generate and save the PDF
    with open(str(result), "wb") as pdf_file:
        pisa_status = pisa.CreatePDF(
            src=full_html,
            dest=pdf_file,
            encoding="utf-8"
        )

    if pisa_status.err:
        return abort("PDF writer failed.")

    return success("Quicknotes saved to PDF.")

@desktop.expose
def native_save_project() -> StatusResponse:
    """Saves entire project as a pickle file via native file dialog"""
    project_name: str = islet.project_name()

    # Ask user where to save the file
    result: Sequence[str]|None = webview.windows[0].create_file_dialog(
        webview.SAVE_DIALOG,
        save_filename=f"{project_name}.pkl",
        file_types=['Pickle file (*.pkl)']
    )

    if result is None:
        return abort("Action aborted by user", "aborted", True)
    try:
        pickle_data: ResponseDict[bytes] = islet.save_as_pickle()
        if pickle_data["ok"] is False:
            return abort(pickle_data["message"], "error", pickle_data["ok"])
        with open(str(result), "wb") as f:
            f.write(pickle_data["data"])
        return success("Project saved.")
    #pylint: disable-next=W0718
    except Exception:
        return abort("Something went wrong")

