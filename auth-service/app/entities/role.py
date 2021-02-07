from sqlalchemy import Column, String, Integer
from .entity import Entity, Base, engine
from marshmallow import Schema, fields

class Role(Entity, Base):
    __tablename__ = 'roles'

    name = Column(String, unique=True)

    def __init__(self, name):
        Entity.__init__(self)
        self.name = name

# Business Object
class RoleSchema(Schema):
    id = fields.Number()
    name = fields.Str()