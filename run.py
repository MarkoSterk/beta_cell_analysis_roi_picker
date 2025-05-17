"""
Start script of app
"""
from pyjolt import PyJolt
from backend import create_app
from backend.extensions import desktop

if __name__ == "__main__":
    app: PyJolt = create_app() #creates PyJolt application
    #app.run("backend:create_app", factory=True, reload=True)
    desktop.init_app(app)
    desktop.run()
