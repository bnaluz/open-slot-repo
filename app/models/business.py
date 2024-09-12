from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone

class Business(db.Model):
    __tablename__ = 'businesses'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    
    services = db.relationship('Service', back_populates='business', cascade='all, delete-orphan')

    def to_dict(self):
        return {
           'id': self.id,
           'owner_id': self.owner_id,
           'name': self.name,
           'description': self.description,
           'address': self.address,
           'city': self.city,
           'state': self.state,
           'image_url': self.image_url,
           'created_at': self.created_at,
        }
