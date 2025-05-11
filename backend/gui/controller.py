"""
GUI controller of the app. Serves the templates of the app
"""
import os
import asyncio
from pyjolt import Blueprint, Response, Request
from backend.extensions import islet
from backend.api.roi.schemas import ReturnTimeSeriesSchema
from backend.utilities.utils import delete_file

gui_controller: Blueprint = Blueprint(__name__, "gui")

@gui_controller.get("/app")
@gui_controller.get("/app/<path:path>")
#pylint: disable-next=W0613
async def index(_, res: Response, **kwargs) -> Response:
    """
    Serves index page of app
    """
    return await res.html("index.html")

@gui_controller.get("/about")
async def about(req: Request, res: Response) -> Response:
    """
    Serves the about information of the app
    """
    logo = req.app.url_for("static", path="logo.png")
    return res.json({
        "message": "About information fetched successfully",
        "status": "success",
        "data": {
            **req.app.get_conf("ABOUT"),
            "logo": logo
        },
    }).status(200)

@gui_controller.get("/video")
async def video_stream(req: Request, res: Response) -> Response:
    """
    Serves the video stream template
    """
    context: dict = {
        "protocol": req.app.get_conf("PROTOCOL"),
        "host": req.app.get_conf("HOST"),
        "port": req.app.get_conf("PORT"),
        "video_url": islet.get_lif_video_url(),
        "width": req.app.get_conf("VIDEO_WIDTH"),
        "height": req.app.get_conf("VIDEO_HEIGHT"),
        "ts_width": req.app.get_conf("TS_VIEWER_WIDTH"),
        "ts_height": req.app.get_conf("TS_VIEWER_HEIGHT"),
    }
    return await res.html("video.html", context)

@gui_controller.get("/shutdown")
async def shutdown(req: Request, res: Response) -> Response:
    """
    Shuts down the server
    """
    app_path: str = req.app.get_conf("APP_PATH")
    lif_video: str = req.app.get_conf("LIF_VIDEO")
    avg_frame: str = req.app.get_conf("AVG_FRAME")
    video_path: str = os.path.join(app_path, "static", lif_video)
    avg_frame_path: str = os.path.join(app_path, "static", avg_frame)
    delete_file(video_path)
    delete_file(avg_frame_path)
    # Spawn a thread that will exit the process in 500ms
    loop = asyncio.get_running_loop()
    # Schedule os._exit(0) in 0.5 seconds
    loop.call_later(0.5, lambda: os._exit(0))

    return res.json({
        "message": "Shutdown successful.",
        "status": "success",
        "data": None
    }).status(200)

@gui_controller.get("/new-project")
async def new_project(_: Request, res: Response) -> Response:
    """Resets the state to initial"""

    islet.reset_islet()
    return res.json({
        "message": "New project started successfully.",
        "status": "success",
        "data": None
    }).status(200)

@gui_controller.get("/state")
async def get_state(_: Request, res: Response) -> Response:
    """
    Gets current state from the islet object
    """
    all_data = islet.get_state()
    return res.json({
        "message": "State fetched successfully.",
        "status": "success",
        "data": {
            "video": all_data["video"],
            "rois": [ReturnTimeSeriesSchema.create_return_object(roi["data"],
                                                                roi["roi_schema"],
                                                                roi["pos"])
                                                                for roi in all_data["rois"]],
            "quicknotes": all_data["quicknotes"],
            "preferences": all_data["preferences"]
        }
    }).status(200)
