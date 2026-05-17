from .todos import todos_bp
from .users import users_bp

def register_routes(app):
    app.register_blueprint(todos_bp, url_prefix="/todos")
    app.register_blueprint(users_bp, url_prefix="/users")
