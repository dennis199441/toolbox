from app import create_app
from flask_jwt_extended import JWTManager
import config

app = create_app()
jwt = JWTManager(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=str(config.Config.PORT), debug=True)
