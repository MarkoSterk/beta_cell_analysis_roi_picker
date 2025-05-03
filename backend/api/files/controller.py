"""
Files controller 
"""
import io
import os
from pyjolt import Blueprint, Request, Response, UploadedFile, abort
import torch
import numpy as np
from readlif.reader import LifFile
from pyeditorjs import EditorJsParser
from xhtml2pdf import pisa
from loguru import logger

from backend.extensions import islet
from backend.utilities.utils import delete_file
from .lif_handlers import create_frames_array, frames_to_video, get_lif_video_url
from .schemas import ExportTimeSeriesOrPosSchema

files_controller: Blueprint = Blueprint(__name__,
                                        "files",
                                        url_prefix="/api/v1/files")

@files_controller.post("/")
async def upload_lif_file(req: Request, res: Response) -> Response:
    """
    For lif file uploading
    """
    data: dict[str, UploadedFile] = await req.get_data("form_and_files")
    app_path: str = req.app.get_conf("APP_PATH")
    temp_folder: str = req.app.get_conf("TEMP_FOLDER")
    temp_lif: str = req.app.get_conf("TEMP_LIF")
    temp_file: str = os.path.join(app_path, "static", temp_folder, temp_lif)
    data["file"].save(temp_file)
    torch_array: torch.Tensor = create_frames_array(LifFile(temp_file))
    islet.save_torch_array(torch_array)
    frames_to_video(torch_array)
    delete_file(temp_file)

    islet.video_url = get_lif_video_url()

    return res.json({
        "message": "File uploaded successfully",
        "status": "success",
        "data": islet.video_url
    })

@files_controller.get("/save-project")
async def save_project(_: Request, res: Response) -> Response:
    """Saves entire project as pickle file"""
    pickle_data: bytes = islet.save_as_pickle()
    project_name: str = islet.project_name()
    return res.send_file(pickle_data, headers={
        "Content-Type": "application/octet-stream",
        "Content-Disposition": f'attachment; filename="{project_name}.pkl"',
        "Content-Length": str(len(pickle_data)),
    }).status(200)

@files_controller.post("/open-project")
async def open_project(req: Request, res: Response) -> Response:
    """Opens project from pickle file"""
    islet.reset_islet()
    data: dict[str, UploadedFile] = await req.get_data("form_and_files")
    islet.load_from_pickle(data["file"])
    frames_to_video(islet.get_torch_array())
    islet.video_url = get_lif_video_url()
    return res.json({
        "message": "Project opened successfully.",
        "status": "success",
        "data": islet.video_url
    }).status(200)

@files_controller.get("/export-timeseries")
async def export_time_series(_: Request, res: Response) -> Response:
    """Saves time series data as txt file"""
    arr = islet.get_all_time_series()
    project_name: str = islet.project_name()
    filename: str = f"time_series_{project_name}.txt"
    buff: io.StringIO = io.StringIO()
    np.savetxt(buff, arr, fmt="%.6lf", delimiter=" ")
    buff.seek(0)
    return res.send_file(buff.getvalue().encode("utf-8"), headers={
        "Content-Type": "text/csv",
        "Content-Disposition": f'attachment; filename="{filename}"'
    })

@files_controller.get("/export-coordinates")
async def export_coordinates(_: Request, res: Response) -> Response:
    """Saves time series data as txt file"""
    arr = islet.get_all_coordinates()
    project_name: str = islet.project_name()
    filename: str = f"coordinates_{project_name}.txt"
    buff: io.StringIO = io.StringIO()
    np.savetxt(buff, arr, fmt="%.2lf", delimiter=" ")
    buff.seek(0)
    return res.send_file(buff.getvalue().encode("utf-8"), headers={
        "Content-Type": "text/csv",
        "Content-Disposition": f'attachment; filename="{filename}"'
    })

@files_controller.get("/export-quicknotes")
async def export_quicknotes(_: Request, res: Response) -> Response:
    """Exports quicknotes as pdf"""

    quicknotes: dict = islet.get_quick_notes()
    parser = EditorJsParser(quicknotes)
    html = parser.html(sanitize=True)
    project_name: str = islet.project_name()
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

    pdf_buffer = io.BytesIO()
    pisa_status = pisa.CreatePDF(src=full_html, dest=pdf_buffer, default_css=None, encoding="utf-8")
    if pisa_status.err:
        logger.debug(f"Failed to generate PDF: {pisa_status.err}")
        abort(msg="Failed to export PDF.", status_code=500, status="error")

    pdf_bytes = pdf_buffer.getvalue()
    return res.send_file(pdf_bytes, headers={
        "Content-Type": "application/pdf",
        "Content-Disposition": f'attachment; filename="quicknotes_{project_name}.pdf"',
        "Content-Length": str(len(pdf_bytes))
    })
