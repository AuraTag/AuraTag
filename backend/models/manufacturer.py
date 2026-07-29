from database import db
from datetime import datetime


class Manufacturer(db.Model):
    __tablename__ = "manufacturers"

    id = db.Column(db.Integer, primary_key=True)

    company_name = db.Column(db.String(150), nullable=False)

    email = db.Column(db.String(120), unique=True, nullable=False)

    password_hash = db.Column(db.String(255), nullable=False)

    phone = db.Column(db.String(20))

    gst_number = db.Column(db.String(50))

    license_number = db.Column(db.String(100))

    address = db.Column(db.String(255))

    city = db.Column(db.String(100))

    state = db.Column(db.String(100))

    country = db.Column(db.String(100))

    website = db.Column(db.String(255))

    logo_url = db.Column(db.String(255))

    created_at = db.Column(db.DateTime, default=datetime.utcnow)