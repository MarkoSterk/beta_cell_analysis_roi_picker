"""Custom types"""
from typing import TypedDict

class StatusResponse[T](TypedDict):
    """Status response for native methods"""
    status: str
    ok: bool
    message: str
    data: T|None
