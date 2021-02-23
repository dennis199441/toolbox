from sqlalchemy import Column, String, Integer
from .entity import Entity, Base, engine
from marshmallow import Schema, fields


class Role(Entity, Base):
    __tablename__ = 'roles'

    name = Column(String, unique=True)
    description = Column(String)

    def __init__(self, name, description=None):
        Entity.__init__(self)
        self.name = name
        self.description = description


class RoleSchema(Schema):
    id = fields.Number()
    name = fields.Str()
    description = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
