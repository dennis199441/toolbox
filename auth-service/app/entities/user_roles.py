from sqlalchemy import Column, String, Integer, ForeignKey
from .entity import Entity, Base
from marshmallow import Schema, fields


class UserRole(Entity, Base):
    __tablename__ = 'user_roles'

    user_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'))
    role_id = Column(Integer, ForeignKey('roles.id', ondelete='CASCADE'))

    def __init__(self, user_id, role_id):
        Entity.__init__(self)
        self.user_id = user_id
        self.role_id = role_id


class UserRoleSchema(Schema):
    id = fields.Number()
    user_id = fields.Number()
    role_id = fields.Number()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
