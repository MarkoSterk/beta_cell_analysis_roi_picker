"""
ROI picker schemas
"""
from typing import Dict, Any, Optional, List
from pydantic import BaseModel, Field, field_validator
import numpy as np
import torch

class RoiInSchema(BaseModel):
    """
    Model with fields for selected ROI
    """
    __location__ = "json"

    roi_type: str = Field("ellipse", description="Type of ROI, defaults to 'ellipse'")
    roi_data: Dict[str, Any] = Field(..., description="Arbitrary ROI data")

class ReturnTimeSeriesSchema(BaseModel):
    """
    Model for serializing ROI data
    """
    data: Any = Field(..., description="Time series data, e.g. tensor or list")
    roi_schema: RoiInSchema = Field(..., description="ROI input schema")
    pos: List[float] = Field(..., description="List of positions")

    @field_validator("data", mode="before")
    @classmethod
    def _ensure_data_list(cls, v):
        """
        If given a PyTorch tensor, convert it to a list before parsing
        """
        if isinstance(v, (torch.Tensor, np.ndarray)):
            return v.tolist()
        return v

    @classmethod
    def create_return_object(
        cls, data: torch.Tensor, roi: dict, pos: List[float]
    ) -> Dict[str, Any]:
        """
        Creates and validates the return object, then dumps it to a dict
        """
        validated = cls.model_validate({
            "data": data,
            "roi_schema": roi,
            "pos": pos
        })
        return validated.model_dump()


class ExportRoiDataSchema(BaseModel):
    """
    Model for exporting ROI data (coordinates and time series)
    """
    coordinates: Any = Field(..., description="Coordinates, e.g. ndarray or list")
    traces: Any = Field(..., description="Time-series traces, e.g. tensor or list")
    roi: Optional[Any] = Field(None, description="Additional ROI metadata")

    @field_validator("coordinates", mode="before")
    @classmethod
    def _ensure_coordinates_list(cls, v):
        """
        If given a NumPy array, convert it to a list before parsing
        """
        if isinstance(v, np.ndarray):
            return v.tolist()
        return v

    @field_validator("traces", mode="before")
    @classmethod
    def _ensure_traces_list(cls, v):
        """
        If given a PyTorch tensor, convert it to a list before parsing
        """
        if isinstance(v, torch.Tensor):
            return v.tolist()
        return v
