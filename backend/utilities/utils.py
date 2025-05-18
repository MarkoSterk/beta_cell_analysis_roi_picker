"""
Utility function
"""
import os
from typing import Any

import torch

from backend.utilities.types import StatusResponse

def get_device() -> str:
    """
    Gets device for torch operations (cpu or gpu)
    """
    device: str = "cpu"
    if torch.cuda.is_available():
        device = "cuda"
    return device

def delete_file(path: str) -> bool:
    """
    Deletes file at provided location
    Returns True if delete was successful otherwise False
    """
    if not os.path.exists(path):
        return False
    os.remove(path)
    return True

def success(msg: str, status: str = "success",
            ok: bool = True, data: Any = None) -> StatusResponse[Any]:
    """Success response"""
    return {
        "message": msg,
        "status": status,
        "ok": ok,
        "data": data
    }

def abort(msg: str, status: str = "error",
          ok: bool = False, data: Any = None) -> StatusResponse[Any]:
    """Aborts native methods"""
    return {
        "message": msg,
        "status": status,
        "ok": ok,
        "data": data
    }
