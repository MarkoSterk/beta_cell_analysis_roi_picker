"""Custom types for Islet"""
from typing import TypedDict

class ResponseDict[T](TypedDict):
    """Response dict"""
    message: str
    ok: bool
    data: T|None
