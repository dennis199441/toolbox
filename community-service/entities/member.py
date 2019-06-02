from sqlalchemy import Column, String, Integer, Numeric, ForeignKey
from .entity import Entity, Base
from marshmallow import Schema, fields

# Entity
class Member(Entity, Base):
    __tablename__ = 'Member'

    id = Column(Integer, primary_key=True)
    community_id = Column(Integer, ForeignKey('Community.id'))
    user_id = Column(Integer)
    description = Column(String)
    lat = Column(Numeric)
    lng = Column(Numeric)

    def __init__(self, community_id, user_id, description, lat, lng):
        Entity.__init__(self)
        self.community_id = community_id
        self.user_id = user_id
        self.description = description
        self.lat = lat
        self.lng = lng

# Business Object
class MemberSchema(Schema):
    id = fields.Number()
    community_id = fields.Number()
    user_id = fields.Number()
    description = fields.Str()
    lat = fields.Number()
    lng = fields.Number()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()