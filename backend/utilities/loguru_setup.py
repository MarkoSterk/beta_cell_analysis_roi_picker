"""Setup for loguru logging"""
import sys
import os
from pathlib import Path
from appdirs import user_log_dir
from loguru import logger

from pyjolt import PyJolt

def running_as_standalone() -> bool:
    """
    Checks if the app is running as a standalone (exe) or as a script
    """
    # 1️⃣ Bundler flag
    if getattr(sys, "frozen", False):
        return True

    # 2️⃣ Fallback: is the interpreter itself an .exe in Program Files?
    exe = os.path.basename(sys.executable).lower()
    return exe.endswith(".exe") and not exe.startswith("python")

def loguru_setup(app: PyJolt):
    """Setup function for loguru"""
    log_dir: Path = None
    if running_as_standalone():
        app_name: str = app.get_conf("APP_NAME")
        log_dir = Path(user_log_dir(app_name))
    else:
        log_dir = Path(app.get_conf("LOGS_DIR"))
    log_dir.mkdir(parents=True, exist_ok=True)

    # 1) remove the default stderr sink
    logger.remove()
    # 2) add console sink (INFO+ only, colorized)
    if sys.stderr is not None:
        logger.add(
            sys.stderr,
            level="DEBUG",
            format="<green>{time:HH:mm:ss}</green> | <level>{level: <7}</level> | {message}",
            colorize=True,
        )

    # 3) add file sink (DEBUG+, rotation & retention)
    log_file = log_dir / "application.log"
    logger.add(
        str(log_file),
        level="DEBUG",
        rotation="3 MB",      # rotate when >3MB
        retention=3,          # keep 3 most recent files
        format="{time:YYYY-MM-DD HH:mm:ss} | {level: <7} | {message}",
        backtrace=True, diagnose=True
    )
