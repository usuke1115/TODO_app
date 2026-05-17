import logging
from logging.handlers import RotatingFileHandler

def setup_logging(app):
    app_handler = RotatingFileHandler(
        "logs/app.log",
        maxBytes=1024 * 1024,
        backupCount=5
    )
    app_handler.setLevel(logging.INFO)
    
    error_handler = RotatingFileHandler(
        "logs/error.log",
        maxBytes=1024 * 1024,
        backupCount=5
    )
    error_handler.setLevel(logging.ERROR)

    formatter = logging.Formatter(
        "%(asctime)s %(levelname)s %(name)s %(message)s"
    )
    
    app_handler.setFormatter(formatter)
    error_handler.setFormatter(formatter)
    
    app.logger.addHandler(app_handler)
    app.logger.addHandler(error_handler)
