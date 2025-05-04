"""
Start script of app
"""
import platform
from pyjolt import PyJolt
from backend import create_app

if __name__ == "__main__":
    app: PyJolt = create_app() #creates PyJolt application
    protocol: str = app.get_conf("PROTOCOL")
    port: int = app.get_conf("PORT")
    host: str = app.get_conf("HOST")
    index: str = app.get_conf("INDEX_ROUTE")
    if platform.system() == "Darwin":
        print("--------------------------------------------------")
        print("ATTENTION!")
        print("Because of known issues with video playback on MacOS use Google Chrome to navigate to")
        print(f"{protocol}://{host}:{port}{index}")
        print("and continue your work.")
        print("--------------------------------------------------")
        app.run(reload=False, port=port, host=host)
    else:
        from backend.extensions import desktop
        desktop.init_app(app)
        desktop.run()
