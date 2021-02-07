from flask import Flask, jsonify, request, Blueprint
from ..services.auth_service import authenticate

auth = Blueprint("auth", __name__)

@auth.route('/login', methods=['POST'])
def login():
    result, status = {}, 200
    username = request.form.get('username')
    password = request.form.get('password')
    try:
        result = authenticate(username, password)
    except:
        result["message"] = "Authentication error!"
        status = 500
    return jsonify(result), status