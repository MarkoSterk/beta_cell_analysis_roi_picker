"""
Start script of app
"""
from pyjolt import PyJolt
from pyjolt.desktop_ui import DesktopUI
from backend import create_app

if __name__ == "__main__":
    app: PyJolt = create_app() #creates PyJolt application
    #app.run("backend:create_app", factory=True, reload=True)
    desktop: DesktopUI = DesktopUI(app)
    desktop.run()
