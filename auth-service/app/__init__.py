from flask import Flask


def create_app():
    """Construct the core application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.Config')
    
    with app.app_context():
        # Imports
        from .api.auth import auth
        from .api.user import user

        # REGISTER ROUTES
        app.register_blueprint(auth, url_prefix="/auth")
        app.register_blueprint(user, url_prefix="/user")

        return app