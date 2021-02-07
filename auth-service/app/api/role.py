from flask import Flask, jsonify, request, Blueprint
from ..entities.entity import Session
from ..entities.role import Role, RoleSchema

role = Blueprint("role", __name__)

@role.route('/', methods=['GET'])
def get_roles():
    session = Session()
    try:
        role_obj = session.query(Role)
        schema = RoleSchema(many=True)
        role = schema.dump(role_obj)
    except Exception as e:
        print("get roles error")
    finally:
        session.close()

    return jsonify(role.data)


@role.route('/', methods=['POST'])
def create_role():
    name = request.form.get('name')

    success = False
    result, messages = {}, []
    role = Role(name)
    session = Session()
    role_count = session.query(Role).filter_by(name=name).count()

    if role_count == 0:
        try:
            session.add(role)
            session.commit()
            success = True
            messages.append('role:{} created'.format(name))
        except Exception as e:
            print('create role exception', e)
            session.rollback()
            messages.append('role:{} creation fail'.format(name))

    session.close()
    result['success'] = success
    result['message'] = messages

    return jsonify(result)

@role.route('/', methods=['DELETE'])
def delete_role():
    name = request.form.get('name')

    success = False
    result, messages = {}, []
    session = Session()
    role = session.query(Role).filter_by(name=name).first()
    try:
        session.delete(role)
        session.commit()
        success = True
        messages.append('role:{} deleted'.format(name))
    except Exception as e:
        print('delete role exception', e)
        session.rollback()
        messages.append('role:{} creation fail'.format(name))

    session.close()
    result['success'] = success
    result['message'] = messages

    return jsonify(result)
