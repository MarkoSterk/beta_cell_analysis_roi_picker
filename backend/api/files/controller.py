"""
Files controller 
"""
from concurrent.futures import ThreadPoolExecutor
from pyjolt import Blueprint, Request, Response, UploadedFile
import torch
import numpy as np
import webview
from readlif.reader import LifFile
from pyeditorjs import EditorJsParser
from xhtml2pdf import pisa
from loguru import logger

from backend.extensions import islet, desktop
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
            "video": islet.video_url
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
def native_upload_lif_file():
    """Native LIF file upload"""

    result = webview.windows[0].create_file_dialog(
        webview.OPEN_DIALOG,
        file_types=['Lif file (*.lif)']
    )

    if result is None:
        return {
            "message": "Upload aborted",
            "status": "aborted",
            "data": None,
            "ok": True
        }
    islet.set_process_status({
        "perc": 0,
        "status": "processing",
        "alive": True,
        "finished": False,
        "message": "Processing LIF file."
    })
    executor.submit(process_lif_upload, result[0])

    return {
        "message": "Process started",
        "status": "success",
        "data": "http://localhost:8080/api/v1/files/progress-check",
        "ok": True
    }

@desktop.expose
def native_open_pkl():
    """Opens pkl file natively"""
    result = desktop.window.create_file_dialog(
            webview.OPEN_DIALOG,
            file_types=['Pickle file (*.pkl)']
    )
    if not result:
        return {
            "status": "aborted",
            "ok": True
        }
    with open(result[0], "rb") as file:
        islet.load_from_pickle(file)
        frames_to_video(islet.get_torch_array(), islet)
        islet.video_url = islet.get_lif_video_url()
    return {
        "message": "Project opened successfully.",
        "status": "success",
        "data": islet.video_url,
        "ok": True
    }


@files_controller.post("/open-project")
async def open_project(req: Request, res: Response) -> Response:
    """Opens project from pickle file"""
    islet.reset_islet()
    data: dict[str, UploadedFile] = await req.get_data("form_and_files")
    islet.load_from_pickle(data["file"])
    frames_to_video(islet.get_torch_array(), islet)
    islet.video_url = islet.get_lif_video_url()
    return res.json({
        "message": "Project opened successfully.",
        "status": "success",
        "data": islet.video_url
    }).status(200)

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
def native_export_coordinates():
    """Export of coordinates with native file dialog"""
    project_name: str = islet.project_name()
    filename: str = f"coordinates_{project_name}.txt"
    result = desktop.window.create_file_dialog(
            webview.SAVE_DIALOG,
            save_filename=filename,
            file_types=['Text file (*.txt)']
    )
    if not result:
        return False
    arr = islet.get_all_coordinates()
    np.savetxt(result, arr, fmt="%.2lf")
    return True

@desktop.expose
def native_export_timeseries():
    """Export of coordinates with native file dialog"""
    project_name: str = islet.project_name()
    filename: str = f"time_series_{project_name}.txt"
    result = desktop.window.create_file_dialog(
            webview.SAVE_DIALOG,
            save_filename=filename,
            file_types=['Text file (*.txt)']
    )
    if not result:
        return {
            "status": "aborted",
            "ok": True
        }
    arr = islet.get_all_time_series()
    np.savetxt(result[0], arr, fmt="%.5lf")
    return {
        "status": "success",
        "ok": True
    }

@desktop.expose
def native_export_quicknotes():
    """Exports quicknotes as PDF using a native file dialog"""

    quicknotes: dict = islet.get_quick_notes()
    parser = EditorJsParser(quicknotes)
    html = parser.html(sanitize=True)
    project_name: str = islet.project_name()
    full_html: str = create_pdf_markup(html, project_name)

    # Open native save dialog
    result = webview.windows[0].create_file_dialog(
        webview.SAVE_DIALOG,
        save_filename=f"quicknotes_{project_name}.pdf",
        file_types=['PDF file (*.pdf)']
    )

    if not result:
        return {
            "status": "aborted",
            "ok": True
        }

    filepath = result[0] if isinstance(result, list) else result

    # Generate and save the PDF
    with open(filepath, "wb") as pdf_file:
        pisa_status = pisa.CreatePDF(
            src=full_html,
            dest=pdf_file,
            encoding="utf-8"
        )

    if pisa_status.err:
        return {
            "status": "failed",
            "ok": False
        }

    return {
        "status": "success",
        "ok": True
    }

@desktop.expose
def native_save_project():
    """Saves entire project as a pickle file via native file dialog"""
    pickle_data: bytes = islet.save_as_pickle()
    project_name: str = islet.project_name()

    # Ask user where to save the file
    result = webview.windows[0].create_file_dialog(
        webview.SAVE_DIALOG,
        save_filename=f"{project_name}.pkl",
        file_types=['Pickle file (*.pkl)']
    )

    if not result:
        return {
            "status": "aborted",
            "ok": True
        }

    filepath = result[0] if isinstance(result, list) else result

    try:
        with open(filepath, "wb") as f:
            f.write(pickle_data)
    #pylint: disable-next=W0718
    except Exception:
        return {
            "status": "failed",
            "ok": False
        }

    return {
        "status": "aborted",
        "ok": True
    }
