"""
Start script of app
"""
from pyjolt import PyJolt
from backend import create_app

if __name__ == "__main__":
    app: PyJolt = create_app() #creates PyJolt application
    from backend.extensions import desktop
    desktop.init_app(app)
    desktop.run()
