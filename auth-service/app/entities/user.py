from sqlalchemy import Column, String, Integer, DateTime
from .entity import Entity, Base
from marshmallow import Schema, fields


class User(Entity, Base):
    __tablename__ = 'users'

    username = Column(String, unique=True)
    email = Column(String, unique=True)
    password = Column(String)
    is_active = Column(Integer)
    verified_email = Column(Integer)
    last_login = Column(DateTime)

    def __init__(self, username, email, password):
        Entity.__init__(self)
        self.username = username
        self.email = email
        self.password = password
        self.is_active = 0
        self.verified_email = 0
        self.last_login = None


class UserSchema(Schema):
    id = fields.Number()
    username = fields.Str()
    email = fields.Str()
    password = fields.Str()
    is_active = fields.Number()
    verified_email = fields.Number()
    last_login = fields.DateTime()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
