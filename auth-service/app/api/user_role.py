from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import jwt_required
from ..decorators.role_required import role_required
from ..entities.entity import Session
from ..entities.user_roles import UserRole, UserRoleSchema
from ..services.user_service import get_user_info
from ..services.role_service import get_user_roles, grant_role, revoke_role

user_role = Blueprint("user_role", __name__)


@user_role.route('/<username>', methods=['GET'])
@jwt_required
@role_required(["Admin"])
def get_roles(username):
    user = get_user_info(username)
    result, status = {}, 200
    try:
        result = get_user_roles(user['id'])
    except:
        result["message"] = "get user roles error"
        status = 500
    return jsonify(result), status


@user_role.route('/', methods=['POST'])
@jwt_required
@role_required(["Admin"])
def grant():
    user_id = request.form.get('user_id')
    role_id = request.form.get('role_id')
    result, status = {}, 200
    try:
        grant_role(user_id, role_id)
        result["message"] = "grant role success"
    except:
        result["message"] = "grant role error"
        status = 500

    return jsonify(result), status


@user_role.route('/', methods=['DELETE'])
@jwt_required
@role_required(["Admin"])
def revoke():
    user_id = request.form.get('user_id')
    role_id = request.form.get('role_id')
    result, status = {}, 200
    try:
        revoke_role(user_id, role_id)
        result["message"] = "revoke role success"
    except:
        result["message"] = "revoke role error"
        status = 500

    return jsonify(result), status
