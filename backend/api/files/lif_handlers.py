"""
Functions for handling lif file
"""
#pylint: disable=E1101
import os
import gc

#import cv2 #type: ignore
from readlif.reader import LifFile
import torch
import numpy as np
from torchvision.transforms import PILToTensor
import imageio as iio
from pyjolt import abort

from backend.utilities.utils import get_device
from backend.configs import Config


def create_frames_array(lif: LifFile) -> torch.Tensor:
    """
    Creates a 3D/4D array from frames of video
    """
    try:
        image_series = list(lif.get_iter_image())[2]
        meta_data = image_series.info['dims']
        width, height, frames = meta_data.x, meta_data.y, meta_data.t
        torch_array = torch.empty(frames, height, width, dtype=torch.uint8)
        transform = PILToTensor()

        for index, frame in enumerate(image_series.get_iter_t(z=0, c=0)):
            torch_array[index,:,:] = transform(frame)

        torch_array = torch_array.to(get_device())

        gc.collect()
        return torch_array
    #pylint: disable-next=W0718
    except Exception:
        return abort(
            msg="Unexpected error during LIF parsing. Please check input data",
            status_code=500,
            status="error"
        )

def frames_to_video(data: torch.Tensor):
    """
    Creates .avi video from sequence of images from LIF file
    """
    fps: int = 24
    frames, _, _ = data.size()

    app_path: str = getattr(Config, "APP_PATH")
    video_name: str = getattr(Config, "LIF_VIDEO")
    output_path: str = os.path.join(app_path, "static", video_name)

    # Ensure output folder exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    try:
        # move data to cpu if on gpu/cuda
        data = data.detach().cpu()

        # Create video writer with correct codec and pixel format
        writer = iio.get_writer(
            output_path,
            fps=fps,
            codec='libx264',
            format='mp4',
            pixelformat='yuv420p'
        )

        for i in range(frames):
            frame = data[i].numpy()  # (height, width)

            if frame.ndim == 2:
                # Expand grayscale frame to 3 channels (RGB)
                frame = np.stack([frame]*3, axis=-1)  # shape (height, width, 3)

            writer.append_data(frame)

        writer.close()
    #pylint: disable-next=W0718
    except Exception:
        abort(
            msg="Unexpected error during video creation. Please check input data",
            status_code=500,
            status="error"
        )

def get_lif_video_url():
    """
    Return url for lif video
    """
    protocol = getattr(Config, "PROTOCOL")
    host = getattr(Config, "HOST")
    port = getattr(Config, "PORT")
    video: str = getattr(Config, "LIF_VIDEO")
    url = f"{protocol}://{host}:{port}/static/{video}"
    return url

def clean_temp_files():
    """
    Cleans all temporary files of the app
    """
    app_base_path = getattr(Config, "APP_PATH")
    roi_video_path = os.path.join(app_base_path, 'static', 'roi_video.mp4')
    if os.path.exists(roi_video_path):
        os.remove(roi_video_path)
