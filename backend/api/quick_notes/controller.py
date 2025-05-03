"""
Quick notes api
"""

from pyjolt import Blueprint, Request, Response

from backend.extensions import islet

quick_notes_controller: Blueprint = Blueprint(__name__,
                                              "quick_notes",
                                              url_prefix="/api/v1/quicknotes")

@quick_notes_controller.post("/")
async def save_notes(req: Request, res: Response):
    """
    Saves notes
    """
    notes = await req.json()
    islet.save_quick_notes(notes)
    return res.json({
        "message": "Notes saved successfully",
        "status": "success",
        "data": notes
    }).status(200)


@quick_notes_controller.get("/")
async def get_notes(_: Request, res: Response):
    """
    Returns quick notes
    """
    return res.json({
        "message": "Notes fetched successfully.",
        "status": "success",
        "data": islet.get_quick_notes()
    }).status(200)
