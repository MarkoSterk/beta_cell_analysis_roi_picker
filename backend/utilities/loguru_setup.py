"""Setup for loguru logging"""
import sys
from pathlib import Path
from loguru import logger

from pyjolt import PyJolt

def loguru_setup(app: PyJolt):
    """Setup function for loguru"""
    Path(app.get_conf("LOGS_DIR")).mkdir(exist_ok=True)

    # 1) remove the default stderr sink
    logger.remove()

    # 2) add console sink (INFO+ only, colorized)
    if sys.stderr is not None:
        logger.add(
            sys.stderr,
            level="INFO",
            format="<green>{time:HH:mm:ss}</green> | <level>{level: <7}</level> | {message}",
            colorize=True,
        )

    # 3) add file sink (DEBUG+, rotation & retention)
    logger.add(
        f'{app.get_conf("LOGS_DIR")}/application.log',
        level="DEBUG",
        rotation="3 MB",      # rotate when >3MB
        retention=3,          # keep 3 most recent files
        format="{time:YYYY-MM-DD HH:mm:ss} | {level: <7} | {message}",
        backtrace=True, diagnose=True
    )
