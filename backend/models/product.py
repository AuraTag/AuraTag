from database import db
from datetime import datetime


class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)

    manufacturer_id = db.Column(
        db.Integer,
        db.ForeignKey("manufacturers.id"),
        nullable=False
    )

    product_name = db.Column(db.String(150), nullable=False)

    brand = db.Column(db.String(100), nullable=False)

    category = db.Column(db.String(100), nullable=False)

    volume = db.Column(db.String(50), nullable=False)

    alcohol_percentage = db.Column(db.String(20), nullable=False)

    description = db.Column(db.Text)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )