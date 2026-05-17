def register_error_handlers(app):
    @app.errorhandler(Exception)
    def handler_error(e):
        app.logger.exception(e)
        return "Internal Server Error", 500
