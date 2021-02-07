import sys
from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..decorators.role_required import role_required
from ..services.user_service import activate_user, deactivate_user, change_user_password, get_user_info, create_new_user

user = Blueprint("user", __name__)


@user.route('/activate/<username>', methods=['GET'])
@jwt_required
@role_required(["Admin"])
def activate(username):
    if not activate_user(username):
        return jsonify(f"fail to activate user: {username}")
    return jsonify(f"activated user: {username}")


@user.route('/deactivate/<username>', methods=['GET'])
@jwt_required
@role_required(["Admin"])
def deactivate(username):
    if not deactivate_user(username):
        return jsonify(f"fail to deactivate user: {username}")
    return jsonify(f"deactivated user: {username}")


@user.route('/change_password', methods=['POST'])
@jwt_required
def change_password():
    current_user = get_jwt_identity()
    username = current_user['username']
    password = request.form.get('password')
    if not change_user_password(username, password):
        return jsonify(f"fail to change password for user:{username}")
    return jsonify(f"change password for user:{username} success")


@user.route('/', methods=['GET'])
@jwt_required
def get_user():
    current_user = get_jwt_identity()
    username = current_user['username']
    user = get_user_info(username)
    return jsonify(user)


@user.route('/', methods=['POST'])
def create_user():
    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    user = create_new_user(username, email, password)
    return jsonify(user)
