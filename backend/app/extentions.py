from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

db: SQLAlchemy = SQLAlchemy()
bcrypt: Bcrypt = Bcrypt()
cors: CORS = CORS()
jwt: JWTManager = JWTManager()

def init_extentions(app):
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)    
    cors.init_app(
        app,
        supports_credentials=True,
        origins={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}}
    )
