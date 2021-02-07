from flask import Flask, jsonify, request, Blueprint
from ..entities.entity import Session
from ..entities.user_roles import UserRole, UserRoleSchema

user_role = Blueprint("user_role", __name__)


@user_role.route('/', methods=['GET'])
def get_user_roles():
    user_id = request.form.get('user_id')
    session = Session()
    try:
        user_role_obj = session.query(UserRole).filter_by(user_id=user_id)
        schema = UserRoleSchema(many=True)
        user_role = schema.dump(user_role_obj)
    except Exception as e:
        print("get roles error")
    finally:
        session.close()

    return jsonify(user_role.data)


@user_role.route('/', methods=['POST'])
def grant():
    user_id = request.form.get('user_id')
    role_id = request.form.get('role_id')

    success = False
    result, messages = {}, []
    user_role = UserRole(user_id, role_id)
    session = Session()
    user_role_count = session.query(UserRole).filter_by(
        user_id=user_id).filter_by(role_id=role_id).count()

    if user_role_count == 0:
        try:
            session.add(user_role)
            session.commit()
            success = True
            messages.append('grant role:{} to user: {} success'.format(role_id, user_id))
        except Exception as e:
            print('grant role exception', e)
            session.rollback()
            messages.append('grant role:{} to user: {} fail'.format(role_id, user_id))

    session.close()
    result['success'] = success
    result['message'] = messages

    return jsonify(result)


@user_role.route('/', methods=['DELETE'])
def revoke():
    user_id = request.form.get('user_id')
    role_id = request.form.get('role_id')

    success = False
    result, messages = {}, []
    session = Session()
    user_role = session.query(UserRole).filter_by(user_id=user_id).filter_by(role_id=role_id).first()
    try:
        session.delete(user_role)
        session.commit()
        success = True
        messages.append('revoke role:{} to user: {} success'.format(role_id, user_id))
    except Exception as e:
        print('revoke role exception', e)
        session.rollback()
        messages.append('revoke role:{} to user: {} fail'.format(role_id, user_id))

    session.close()
    result['success'] = success
    result['message'] = messages

    return jsonify(result)
