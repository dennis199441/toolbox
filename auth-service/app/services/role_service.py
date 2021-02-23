from ..entities.entity import Session
from ..entities.user_roles import UserRole, UserRoleSchema
from ..entities.role import Role, RoleSchema


def get_role_by_name(role_name):
    session = Session()
    role_obj = session.query(Role).filter_by(name=role_name).first()
    schema = RoleSchema(many=False)
    role = schema.dump(role_obj)
    session.close()
    return role.data


def get_role_by_id(role_id):
    session = Session()
    role_obj = session.query(Role).filter_by(id=role_id).first()
    schema = RoleSchema(many=False)
    role = schema.dump(role_obj)
    session.close()
    return role.data


def get_user_roles(user_id):
    session = Session()
    user_roles = session.query(UserRole).filter_by(user_id=user_id)
    role_ids = [user_role.role_id for user_role in user_roles]
    role_obj = session.query(Role).filter(Role.id.in_(role_ids)).all()
    schema = RoleSchema(many=True)
    roles = schema.dump(role_obj)
    session.close()
    return roles.data


def grant_role(user_id, role_id):
    user_role = UserRole(user_id, role_id)
    session = Session()
    session.add(user_role)
    session.commit()
    session.close()


def revoke_role(user_id, role_id):
    session = Session()
    user_role = session.query(UserRole).filter_by(
        user_id=user_id).filter_by(role_id=role_id).first()
    session.delete(user_role)
    session.commit()
    session.close()


def get_all_roles():
    session = Session()
    role_obj = session.query(Role)
    schema = RoleSchema(many=True)
    role = schema.dump(role_obj)
    session.close()
    return role.data


def create_new_role(name, desc):
    session = Session()
    role_obj = Role(name, desc)
    session.add(role_obj)
    session.commit()
    schema = RoleSchema(many=False)
    role = schema.dump(role_obj)
    session.close()
    return role.data


def delete_existing_role(name):
    session = Session()
    role = session.query(Role).filter_by(name=name).first()
    session.delete(role)
    session.commit()
    session.close()
