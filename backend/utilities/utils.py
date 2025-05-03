"""
Utility function
"""
import os

import torch

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
