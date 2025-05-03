"""
Analysis api
"""
from pyjolt import Blueprint, Request, Response

from backend.extensions import islet
from .schemas import RoiInSchema, ReturnTimeSeriesSchema

roi_controller: Blueprint = Blueprint(__name__,
                                    "roi",
                                    url_prefix="/api/v1/roi")

@roi_controller.post("/")
def get_roi_ts(_: Request, res: Response, json_data: RoiInSchema):
    """
    Gets time series for ROI based on provided
    ellipse coordinates: startX, startY, endX, endY
    """
    roi_time_series, pos = islet.get_roi_time_series(
        json_data.roi_type,
        json_data.roi_data
    )

    islet.add_selected_roi_data({
        "data": roi_time_series,
        "roi_schema": json_data.model_dump(),
        "pos": pos
    })
    return res.json({
        "data": ReturnTimeSeriesSchema.create_return_object(roi_time_series,
                                                           json_data.model_dump(),
                                                           pos),
        "message": "ROI selected successfully",
        "status": "success"
    }).status(200)

@roi_controller.delete("/<int:index>")
def remove_selected_roi(_: Request, res: Response, index: int):
    """
    Removes selected ROI data
    """
    islet.remove_selected_roi_data(index)
    return res.json({
        "data": None,
        "message": "Action performed successfully.",
        "status": "success"
    }).status(200)

@roi_controller.get("/<int:index>")
def get_selected_roi(_: Request, res: Response, index: int):
    """
    Returns selected TS based on index
    """
    return res.json({
        "data": islet.get_selected_roi_data(index),
        "message": "Data fetched successfully",
        "status": "success"
    }).status(200)

