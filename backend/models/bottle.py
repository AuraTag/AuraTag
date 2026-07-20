from database import db
from datetime import datetime

class Bottle(db.Model):
    __tablename__ = "bottles"

    id = db.Column(db.Integer, primary_key=True)

    bottle_name = db.Column(db.String(150), nullable=False)

    brand = db.Column(db.String(150), nullable=False)

    batch_number = db.Column(db.String(100), nullable=False)

    manufacture_date = db.Column(db.Date, nullable=False)

    expiry_date = db.Column(db.Date, nullable=False)

    nfc_uid = db.Column(db.String(200), unique=True, nullable=False)

    manufacturer_id = db.Column(
        db.Integer,
        db.ForeignKey("manufacturers.id"),
        nullable=False
    )

    created_at = db.Column(db.DateTime, default=datetime.utcnow)