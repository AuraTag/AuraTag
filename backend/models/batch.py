from database import db
from datetime import datetime


class Batch(db.Model):
    __tablename__ = "batches"

    id = db.Column(db.Integer, primary_key=True)

    manufacturer_id = db.Column(
        db.Integer,
        db.ForeignKey("manufacturers.id"),
        nullable=False
    )

    product_id = db.Column(
        db.Integer,
        db.ForeignKey("products.id"),
        nullable=False
    )

    batch_number = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    quantity = db.Column(
        db.Integer,
        nullable=False
    )

    manufacture_date = db.Column(
        db.Date,
        nullable=False
    )

    expiry_date = db.Column(
        db.Date,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    # Relationships
    manufacturer = db.relationship(
        "Manufacturer",
        backref="batches"
    )

    product = db.relationship(
        "Product",
        backref="batches"
    )