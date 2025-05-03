"""
Configurations for application
"""
import os

class Config:
    """
    All configs for app
    """
    APP_PATH: str = os.path.dirname(__file__)
    LOGS_DIR: str = os.path.join(APP_PATH, "logs")
    CHROMIUM_PATH: str = os.path.join(APP_PATH, "chromium")
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
    LIF_VIDEO: str = "lif_video.mp4"
    TEMP_LIF: str = "temp_lif.lif"

    ABOUT: dict[str, str] = {
        "version": 1.0,
        "name": APP_NAME,
        "author": "Marko Šterk",
        "homepage": "/",
        "description": """Tool for selecting and exporting cellular time series from .lif 
                            files from microscopy recordings. This tool is distributed as 
                            open source software as is. Feel free to use it for your research,
                            but please don't forget to include an appropriate citation."""
    }
