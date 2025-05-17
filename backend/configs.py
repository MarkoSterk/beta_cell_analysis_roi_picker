"""
Configurations for application
"""
import os
import socket

def find_available_port(preferred_port=8080):
    """Return 8080 if free, else find and return an available port."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        try:
            sock.bind(("127.0.0.1", preferred_port))
            return preferred_port
        except OSError:
            # Port 8080 is in use; find a random free port
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as temp_sock:
                temp_sock.bind(("127.0.0.1", 0))  # OS assigns an available port
                return temp_sock.getsockname()[1]

class Config:
    """
    All configs for app
    """
    APP_PATH: str = os.path.dirname(__file__)
    LOGS_DIR: str = os.path.join(APP_PATH, "logs")
    TEMP_FOLDER: str = "temp_files"
    APP_NAME: str = "Beta cell analysis"
    HOST: str = "localhost"
    PORT: int = 8080
    PROTOCOL: str = "http"
    INDEX_ROUTE: str = "/app"
    TEMPLATES_STRICT: bool = True
    DEBUG: bool = True

    #ANALYSIS CONFIGURATIONS

    ROI_PICKER_BATCHES = 100
    TS_VIEWER_WIDTH: int = 600
    TS_VIEWER_HEIGHT: int = 350
    VIDEO_WIDTH: int = 500
    VIDEO_HEIGHT: int = 500
    LIF_VIDEO: str = "lif_video_%.mp4"
    AVG_FRAME: str = "avg_frame.png"
    TEMP_LIF: str = "temp_lif.lif"

    ABOUT: dict[str, str] = {
        "version": 1.0,
        "name": APP_NAME,
        "author": "Marko Šterk, Marko Gosak",
        "homepage": "https://github.com/MarkoSterk/beta_cell_analysis_roi_picker",
        "description": """Tool for selecting and exporting cellular time series from .lif 
                            files from microscopy recordings. This tool is distributed as 
                            open source software as is. Feel free to use it for your research,
                            but please don't forget to include an appropriate citation."""
    }
