import sys
from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..decorators.role_required import role_required
from ..services.user_service import activate_user, deactivate_user, change_user_password, get_user_info, get_user_info_by_email, get_all_users, create_new_user, update_username

user = Blueprint("user", __name__)


@user.route('/activate/<username>', methods=['GET'])
@jwt_required
@role_required(["Admin"])
def activate(username):
    if not activate_user(username):
        return jsonify(f"fail to activate user: {username}"), 500
    return jsonify(f"activated user: {username}")


@user.route('/deactivate/<username>', methods=['GET'])
@jwt_required
@role_required(["Admin"])
def deactivate(username):
    if not deactivate_user(username):
        return jsonify(f"fail to deactivate user: {username}"), 500
    return jsonify(f"deactivated user: {username}")


@user.route('/<username>', methods=['GET'])
@jwt_required
@role_required(["Admin"])
def get_user_details(username):
    user = get_user_info(username)
    return jsonify(user)


@user.route('/change_password', methods=['POST'])
@jwt_required
def change_password():
    current_user = get_jwt_identity()
    username = current_user['username']
    old_pw = request.form.get('oldPassword')
    new_pw = request.form.get('newPassword')
    result, status = {}, 200
    if not change_user_password(username, old_pw, new_pw):
        status = 500
        result['message'] = f"fail to change password for user:{username}"
        return jsonify(result), status
    result['message'] = f"change password for user:{username} success"
    return jsonify(result), status


@user.route('/change_username', methods=['POST'])
@jwt_required
def change_username():
    current_user = get_jwt_identity()
    userId = current_user['id']
    username = request.form.get('username')
    result, status = {}, 200
    if not update_username(userId, username):
        status = 500
        result['message'] = f"fail to update username for user:{userId}"
        return jsonify(result), status
    result['message'] = f"update username for user:{userId} success"
    return jsonify(result), status


@user.route('/me', methods=['GET'])
@jwt_required
def get_user():
    current_user = get_jwt_identity()
    email = current_user['email']
    user = get_user_info_by_email(email)
    return jsonify(user)


@user.route('/', methods=['GET'])
@jwt_required
@role_required(["Admin"])
def get_users():
    users = get_all_users()
    return jsonify(users)


@user.route('/', methods=['POST'])
def create_user():
    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    result, status = {}, 200
    user = create_new_user(username, email, password)
    if not user:
        result['sucecss'] = False
        result['message'] = "Failed to create user"
        status = 500
        return jsonify(result), status
    result['sucecss'] = True
    result['message'] = f"Create user success. user_id={user['id']}"
    return jsonify(result), status
