"""
Entry point for app
"""
#supressess non-toplevel import warnings for blueprint imports
#pylint: disable=C0415,W0611
import os
from pyjolt import PyJolt
from backend.configs import Config
from backend.utilities.utils import delete_file

def create_app(config: object = Config) -> PyJolt:
    """
    Factory function for application
    """
    app: PyJolt = PyJolt(__name__, app_name="Beta cell analysis", version="1.0")
    app.configure_app(config)

    from backend.utilities.loguru_setup import loguru_setup
    loguru_setup(app)

    from backend.extensions import islet
    islet.init_app(app)

    from backend.gui import gui_controller
    app.register_blueprint(gui_controller)

    from backend.api.quick_notes import quick_notes_controller
    app.register_blueprint(quick_notes_controller)

    from backend.api.preferences import preferences_controller
    app.register_blueprint(preferences_controller)

    from backend.api.files import files_controller
    app.register_blueprint(files_controller)

    from backend.api.roi import roi_controller
    app.register_blueprint(roi_controller)

    @app.on_shutdown
    @app.on_startup
    def on_startup_shutdown(app):
        """
        Runs on startup/shutdown
        """
        islet.delete_video_and_avg_frame()

    app.build()
    #logger.info("PyJolt application built successfully.")
    return app
