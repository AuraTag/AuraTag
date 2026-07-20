from flask import Blueprint
from models.bottle import Bottle

verify_bp = Blueprint("verify", __name__)


@verify_bp.route("/<string:nfc_uid>", methods=["GET"])
def verify_bottle(nfc_uid):

    bottle = Bottle.query.filter_by(nfc_uid=nfc_uid).first()

    if bottle:

        return {
            "status": "genuine",
            "bottle_name": bottle.bottle_name,
            "brand": bottle.brand,
            "batch_number": bottle.batch_number,
            "manufacture_date": bottle.manufacture_date,
            "expiry_date": bottle.expiry_date
        }, 200

    return {
        "status": "counterfeit",
        "message": "Bottle not found"
    }, 404