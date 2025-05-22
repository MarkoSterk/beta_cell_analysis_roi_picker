"""
Preferences api
"""
#pylint: disable=C0415
from pyjolt import Blueprint, Request, Response

from .schemas import PreferencesSchema

preferences_controller: Blueprint = Blueprint(__name__,
                                              "preferences",
                                              url_prefix="/api/v1/preferences")

@preferences_controller.get("/")
async def get_preferences(_: Request, res: Response):
    """
    Returns current preferences
    """
    from backend.extensions import islet
    preferences: dict = islet.get_preferences()
    return res.json({
        "message": "Preferences fetched successfully.",
        "status": "success",
        "data": preferences
    }).status(200)

@preferences_controller.post("/")
async def save_preferences(_: Request, res: Response, data: PreferencesSchema):
    """
    Saves incoming preferences
    """
    from backend.extensions import islet
    islet.save_preferences(data.model_dump())

    return res.json({
        "message": "Preferences fetched successfully",
        "status": "success",
        "data": islet.get_preferences()
    })
