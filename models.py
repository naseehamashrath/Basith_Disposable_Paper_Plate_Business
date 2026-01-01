from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Enquiry(db.Model):
    """
    Model to store customer enquiries.
    """
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), nullable=True)
    product_interest = db.Column(db.String(100), nullable=True)
    message = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone": self.phone,
            "email": self.email,
            "product_interest": self.product_interest,
            "message": self.message,
            "created_at": self.created_at.isoformat()
        }

class Analytics(db.Model):
    """
    Model to store basic ethical analytics (no PII).
    """
    id = db.Column(db.Integer, primary_key=True)
    page_view = db.Column(db.String(50), nullable=False)
    device_type = db.Column(db.String(20), nullable=True) # e.g., 'mobile', 'desktop'
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
