from datetime import datetime
from database import db


class BottleScan(db.Model):
    __tablename__ = "bottle_scans"

    id = db.Column(db.Integer, primary_key=True)

    bottle_id = db.Column(
        db.Integer,
        db.ForeignKey("bottles.id"),
        nullable=False
    )

    scan_time = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    ip_address = db.Column(db.String(50))

    result = db.Column(db.String(20))