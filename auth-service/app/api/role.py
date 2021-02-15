import sys
from flask import Flask, jsonify, request, Blueprint
from flask_jwt_extended import jwt_required
from ..decorators.role_required import role_required
from ..entities.entity import Session
from ..entities.role import Role, RoleSchema
from ..services.role_service import get_all_roles, get_role_by_name, create_new_role, delete_existing_role

role = Blueprint("role", __name__)


@role.route('/', methods=['GET'])
@jwt_required
@role_required(["Admin"])
def get_roles():
    result, status = {}, 200
    try:
        result = get_all_roles()
    except:
        result["message"] = "Get all roles error"
        status = 500
    return jsonify(result), status


@role.route('/<rolename>', methods=['GET'])
@jwt_required
@role_required(["Admin"])
def get_role(rolename):
    result, status = {}, 200
    try:
        result = get_role_by_name(rolename)
    except:
        result["message"] = "Get all roles error"
        status = 500
    return jsonify(result), status


@role.route('/', methods=['POST'])
@jwt_required
@role_required(["Admin"])
def create_role():
    name = request.form.get('name')
    description = request.form.get('description')
    result, status = {}, 200
    try:
        result = create_new_role(name, description)
    except:
        result["message"] = "Create role error"
        status = 500
    return jsonify(result), status


@role.route('/', methods=['DELETE'])
@jwt_required
@role_required(["Admin"])
def delete_role():
    name = request.form.get('name')
    result, status = {}, 200
    try:
        delete_existing_role(name)
        result["message"] = f"Delete role:{name} success"
    except:
        result["message"] = "Delete role error"
        status = 500
    return jsonify(result), status
