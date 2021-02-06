from flask import Flask, jsonify, request, Blueprint
from ..entities.entity import Session
from ..entities.user import User, UserSchema
from passlib.hash import pbkdf2_sha256 as sha256
from flask_jwt_extended import (create_access_token, create_refresh_token)

auth = Blueprint("auth", __name__)

@auth.route('/login', methods=['POST'])
def login():
    result = {}
    username = request.form.get('username')
    password = request.form.get('password')
    session = Session()

    user_obj = session.query(User).filter_by(username=username)
    if user_obj.count() == 1:
        schema = UserSchema(many=True)
        user = schema.dump(user_obj)
        identity = {}
        identity['id'] = user.data[0]['id']
        identity['email'] = user.data[0]['email']
        identity['username'] = user.data[0]['username']
        hash_pw = user.data[0]['password']
        if sha256.verify(password, hash_pw):
            access_token = create_access_token(identity=identity)
            refresh_token = create_refresh_token(identity=identity)
            result['messages'] = 'Logged in as {}'.format(username)
            result['access_token'] = access_token
            result['refresh_token'] = refresh_token
        else:
            result['messages'] = 'Authentication failed'
    else:
        result['messages'] = 'Username not found'

    return jsonify(result)