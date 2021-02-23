from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import jwt_refresh_token_required, get_jwt_identity
from ..services.auth_service import authenticate, refresh_token

auth = Blueprint("auth", __name__)


@auth.route('/login', methods=['POST'])
def login():
    result, status = {}, 200
    username = request.form.get('username')
    password = request.form.get('password')
    try:
        result, status = authenticate(username, password)
    except:
        result["message"] = "Authentication error!"
        status = 500
    return jsonify(result), status


@auth.route('/refresh', methods=['POST'])
@jwt_refresh_token_required
def refresh():
    current_user = get_jwt_identity()
    return jsonify(refresh_token(current_user))
