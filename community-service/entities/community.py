from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from .entity import Entity, Base
from marshmallow import Schema, fields

# Entity
class Community(Entity, Base):
    __tablename__ = 'Community'

    id = Column(Integer, primary_key=True)
    community_name = Column(String)
    members = relationship("Member", cascade="all,delete")

    def __init__(self, community_name):
        Entity.__init__(self)
        self.community_name = community_name

# Business Object
class CommunitySchema(Schema):
    id = fields.Number()
    community_name = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
