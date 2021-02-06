from sqlalchemy import Column, String, Integer
from .entity import Entity, Base
from marshmallow import Schema, fields

# Entity
class User(Entity, Base):
    __tablename__ = 'User'

    username = Column(String)
    email = Column(String)
    password = Column(String)
    is_active = Column(Integer)

    def __init__(self, username, email, password):
        Entity.__init__(self)
        self.username = username
        self.email = email
        self.password = password
        self.is_active = 0

# Business Object
class UserSchema(Schema):
    id = fields.Number()
    username = fields.Str()
    email = fields.Str()
    password = fields.Str()
    is_active = fields.Number()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
