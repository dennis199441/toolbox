from flask_jwt_extended import (create_access_token, create_refresh_token)
from passlib.hash import pbkdf2_sha256 as sha256
from ..entities.entity import Session
from ..entities.user import User, UserSchema
from ..services.user_service import get_user_info, update_last_login
from ..services.role_service import get_user_roles, get_role_by_id


def authenticate(username, password):
    result, status = {}, 200
    user = get_user_info(username)
    if not user:
        result['messages'] = 'Username not found'
        status = 401
        return result, status

    hash_pw = user['password']
    if not sha256.verify(password, hash_pw):
        result['messages'] = 'Authentication failed'
        status = 401
        return result, status

    if user['is_active'] == 0:
        result['messages'] = 'Account is deactivated.'
        status = 401
        return result, status

    _ = update_last_login(username)
    user_roles = get_user_roles(user['id'])
    roles = []
    for user_role in user_roles:
        roles.append(user_role['name'])

    identity = {}
    identity['id'] = user['id']
    identity['email'] = user['email']
    identity['username'] = user['username']
    identity['roles'] = roles

    access_token = create_access_token(identity=identity)
    refresh_token = create_refresh_token(identity=identity)
    result['messages'] = 'Logged in as {}'.format(username)
    result['access_token'] = access_token
    result['refresh_token'] = refresh_token

    return result, status


def refresh_token(current_user):
    return {
        'access_token': create_access_token(identity=current_user)
    }
