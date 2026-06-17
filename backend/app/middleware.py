from flask import request

def register_middleware(app):
    @app.before_request
    def log_request():
        app.logger.info(f"{request.method} {request.path}")

    @app.after_request
    def cors_middleware(res):
        res.headers["Content-Type"] = "application/json"
        res.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
        return res
