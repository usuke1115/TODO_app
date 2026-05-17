from flask import Flask
import secrets
from .config import configure
from .extentions import db
from .extentions import init_extentions
from .handlers import register_error_handlers
from .logging_config import setup_logging
from .middleware import register_middleware
from .routes import register_routes

def create_app(config_class=None) -> Flask:
    app = Flask(__name__)
    
    configure(app, config_class)    
    setup_logging(app)
    register_middleware(app)
    register_error_handlers(app)
    init_extentions(app)
    register_routes(app)
    
    # app.secret_key = secrets.token_bytes(32)
    app.secret_key = "dev_env"
    
    with app.app_context():
        db.create_all()
    
    return app
