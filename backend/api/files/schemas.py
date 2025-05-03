"""
Analysis schemas
"""
from typing import Annotated, BinaryIO, Dict, Any

import numpy as np
from pydantic import BaseModel, Field, field_validator, model_validator

class PickleUploadSchema(BaseModel):
    """
    Pickle file import schema
    Schema for a single Leica Image File Format (.liff) upload.
    Works with ANY framework or CLI that can hand you
    (1) the original filename and
    (2) a binary file-like object.

    You can extend it with extra metadata (e.g. experiment ID)
    without touching the validator.
    """
    __location__ = "form_and_files"

    filename: Annotated[
        str,
        Field(..., description="Original file name, must end with .lif"),
    ]
    file: Annotated[
        BinaryIO,
        Field(
            ..., description="Open file object"
        ),
    ]

    # --------------------------------------------------------------------- #
    # Validators                                                            #
    # --------------------------------------------------------------------- #
    @field_validator("filename")
    @classmethod
    def enforce_lif_extension(cls, v: str) -> str:  # noqa: N805
        """
        Validates file extension
        """
        if not v.lower().endswith(".lif"):
            raise ValueError("File must have a .liff extension.")
        return v

    @field_validator("file")
    @classmethod
    def verify_file_like(cls, f: BinaryIO):  # noqa: N805
        """
        Validates the data is a file-like object
        """
        if not (hasattr(f, "read") and callable(f.read)):
            raise TypeError("`file` must be a binary file-like object.")
        return f

    model_config = {"arbitrary_types_allowed": True}


class LiffImportSchema(BaseModel):
    """
    Liff file import schema
    Schema for a single Leica Image File Format (.liff) upload.
    Works with ANY framework or CLI that can hand you
    (1) the original filename and
    (2) a binary file-like object.

    You can extend it with extra metadata (e.g. experiment ID)
    without touching the validator.
    """
    __location__ = "form_and_files"

    filename: Annotated[
        str,
        Field(..., description="Original file name, must end with .lif"),
    ]
    file: Annotated[
        BinaryIO,
        Field(
            ..., description="Open file object"
        ),
    ]

    # --------------------------------------------------------------------- #
    # Validators                                                            #
    # --------------------------------------------------------------------- #
    @field_validator("filename")
    @classmethod
    def enforce_lif_extension(cls, v: str) -> str:  # noqa: N805
        """
        Validates file extension
        """
        if not v.lower().endswith(".lif"):
            raise ValueError("File must have a .liff extension.")
        return v

    @field_validator("file")
    @classmethod
    def verify_file_like(cls, f: BinaryIO):  # noqa: N805
        """
        Validates the data is a file-like object
        """
        if not (hasattr(f, "read") and callable(f.read)):
            raise TypeError("`file` must be a binary file-like object.")
        return f

    model_config = {"arbitrary_types_allowed": True}

class ExportTimeSeriesOrPosSchema(BaseModel):
    """Schema for exporting time series data"""

    filename: str = Field(...)
    mime_type: str = Field(default="text/plain")
    content: Any = Field(..., description="Time series data")

    @field_validator("content", mode="before")
    @classmethod
    def _ensure_data_list(cls, v):
        """
        If given a numpy array, convert it to a list before parsing
        """
        if isinstance(v, np.ndarray):
            return v.tolist()
        return v

    @classmethod
    def create_return_object(cls, filename: str,
                             content: np.ndarray,
                             mime_type: str = "text/plain") -> Dict[str, Any]:
        """
        Creates and validates the return object, then dumps it to a dict
        """
        validated = cls.model_validate({
            "content": content,
            "filename": filename,
            "mine_type": mime_type
        })
        return validated.model_dump()
