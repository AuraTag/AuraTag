from flask import Blueprint
from flask_jwt_extended import jwt_required
from database import db
from models.bottle import Bottle
from datetime import datetime

verify_bp = Blueprint("verify", __name__)


# =====================================
# Verify Bottle
# =====================================
@verify_bp.route("/<string:uid>", methods=["GET"])
def verify_bottle(uid):

    bottle = Bottle.query.filter_by(
        nfc_uid=uid
    ).first()

    if not bottle:
        return {
            "genuine": False,
            "message": "Counterfeit Bottle"
        }, 404

    bottle.verification_count += 1
    bottle.last_verified = datetime.utcnow()

    db.session.commit()

    return {
        "genuine": True,
        "message": "Bottle Verified",

        "bottle_name": bottle.bottle_name,
        "brand": bottle.brand,
        "batch_number": bottle.batch_number,

        "manufacture_date": bottle.manufacture_date.strftime("%Y-%m-%d"),
        "expiry_date": bottle.expiry_date.strftime("%Y-%m-%d"),

        "verification_count": bottle.verification_count,

        "is_opened": bottle.is_opened,

        "opened_at":
        bottle.opened_at.strftime("%Y-%m-%d %H:%M:%S")
        if bottle.opened_at else None,

        "last_verified":
        bottle.last_verified.strftime("%Y-%m-%d %H:%M:%S")
    }