from app import create_app
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin
import config

app = create_app()
cors = CORS(app)
jwt = JWTManager(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=str(config.Config.PORT), debug=True)
