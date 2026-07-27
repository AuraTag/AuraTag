from database import db
from datetime import datetime


class VerificationLog(db.Model):
    __tablename__ = "verification_logs"

    id = db.Column(db.Integer, primary_key=True)

    bottle_id = db.Column(
        db.Integer,
        db.ForeignKey("bottles.id"),
        nullable=False
    )

    verified_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    status = db.Column(
        db.String(30),
        nullable=False
    )

    ip_address = db.Column(
        db.String(50),
        nullable=True
    )

    user_agent = db.Column(
        db.Text,
        nullable=True
    )

    bottle = db.relationship(
        "Bottle",
        backref="verification_logs"
    )