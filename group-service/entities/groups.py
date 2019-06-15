from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from .entity import Entity, Base
from marshmallow import Schema, fields

# Entity
class Groups(Entity, Base):
    __tablename__ = 'Groups'

    id = Column(Integer, primary_key=True)
    group_name = Column(String)
    description = Column(String)
    created_by = Column(Integer)
    members = relationship("Member", cascade="all,delete")

    def __init__(self, group_name, description, created_by):
        Entity.__init__(self)
        self.group_name = group_name
        self.description = description
        self.created_by = created_by

# Business Object
class GroupsSchema(Schema):
    id = fields.Number()
    group_name = fields.Str()
    description = fields.Str()
    created_by = fields.Number()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
