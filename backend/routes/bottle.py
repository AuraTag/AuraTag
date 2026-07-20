from flask import Blueprint, request
from database import db
from models.bottle import Bottle

bottle_bp = Blueprint("bottle", __name__)


@bottle_bp.route("/", methods=["GET"])
def home():
    return {
        "message": "Bottle Route Working"
    }


@bottle_bp.route("/register", methods=["POST"])
def register_bottle():

    data = request.get_json()

    bottle = Bottle(
        bottle_name=data["bottle_name"],
        brand=data["brand"],
        batch_number=data["batch_number"],
        manufacture_date=data["manufacture_date"],
        expiry_date=data["expiry_date"],
        nfc_uid=data["nfc_uid"],
        manufacturer_id=data["manufacturer_id"]
    )

    db.session.add(bottle)
    db.session.commit()

    return {
        "message": "Bottle Registered Successfully"
    }, 201


@bottle_bp.route("/all", methods=["GET"])
def get_bottles():

    bottles = Bottle.query.all()

    result = []

    for bottle in bottles:

        result.append({

            "id": bottle.id,
            "bottle_name": bottle.bottle_name,
            "brand": bottle.brand,
            "batch_number": bottle.batch_number,
            "nfc_uid": bottle.nfc_uid

        })

    return result, 200


@bottle_bp.route("/<int:id>", methods=["GET"])
def get_bottle(id):

    bottle = Bottle.query.get(id)

    if bottle is None:
        return {
            "message": "Bottle not found"
        }, 404

    return {
        "id": bottle.id,
        "bottle_name": bottle.bottle_name,
        "brand": bottle.brand,
        "batch_number": bottle.batch_number,
        "manufacture_date": bottle.manufacture_date,
        "expiry_date": bottle.expiry_date,
        "nfc_uid": bottle.nfc_uid,
        "manufacturer_id": bottle.manufacturer_id
    }, 200