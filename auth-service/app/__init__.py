from flask import Flask


def create_app():
    """Construct the core application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object('config.Config')
    
    with app.app_context():
        # Imports
        from .api.auth import auth
        from .api.user import user
        from .api.role import role
        from .api.user_role import user_role

        # REGISTER ROUTES
        app.register_blueprint(auth, url_prefix="/auth")
        app.register_blueprint(user, url_prefix="/user")
        app.register_blueprint(role, url_prefix="/role")
        app.register_blueprint(user_role, url_prefix="/userrole")

        return app