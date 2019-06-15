from sqlalchemy import Column, String, Integer, Numeric, ForeignKey
from .entity import Entity, Base
from marshmallow import Schema, fields

# Entity
class Member(Entity, Base):
    __tablename__ = 'Member'

    id = Column(Integer, primary_key=True)
    group_id = Column(Integer, ForeignKey('Groups.id'))
    user_id = Column(Integer)
    description = Column(String)
    role = Column(String)

    def __init__(self, group_id, user_id, description, role):
        Entity.__init__(self)
        self.group_id = group_id
        self.user_id = user_id
        self.description = description
        self.role = role

# Business Object
class MemberSchema(Schema):
    id = fields.Number()
    group_id = fields.Number()
    user_id = fields.Number()
    description = fields.Str()
    role = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()