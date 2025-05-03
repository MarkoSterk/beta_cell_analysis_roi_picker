"""
Preferences schemas for validation and (de)serialization
"""
from typing import Any

from pydantic import BaseModel, Field, field_validator

class PreferencesSchema(BaseModel):
    """
    Analysis preferences
    """
    __location__ = "json"

    project_name: str = Field(default="Project")
    sampling: float = Field(default=10.0)
    px_to_um: float = Field(default=1.0)

    @field_validator('sampling', 'px_to_um')
    @classmethod
    def ensure_two_decimals(cls, v: Any):
        """
        Rounds sampling and px_to_um have two decimal places
        """
        if isinstance(v, (float, int)):
            return round(v, 2)
        return v
