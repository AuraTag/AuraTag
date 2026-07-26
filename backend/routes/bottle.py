from flask import Blueprint, request
from database import db
from models.bottle import Bottle
from flask_jwt_extended import jwt_required, get_jwt_identity

bottle_bp = Blueprint("bottle", __name__)


@bottle_bp.route("/", methods=["GET"])
def home():
    return {
        "message": "Bottle Route Working"
    }


@bottle_bp.route("/register", methods=["POST"])
@jwt_required()
def register_bottle():

    try:

        data = request.get_json()

        manufacturer_id = int(get_jwt_identity())

        bottle = Bottle(
            bottle_name=data["bottle_name"],
            brand=data["brand"],
            batch_number=data["batch_number"],
            manufacture_date=data["manufacture_date"],
            expiry_date=data["expiry_date"],
            manufacturer_id=manufacturer_id
        )

        db.session.add(bottle)
        db.session.commit()

        return {
            "message": "Bottle Registered Successfully",
            "nfc_uid": bottle.nfc_uid
        }, 201

    except Exception as e:
        db.session.rollback()

        return {
            "error": str(e)
        }, 500

@bottle_bp.route("/all", methods=["GET"])
@jwt_required()
def get_bottles():

    manufacturer_id = int(get_jwt_identity())

    print("Logged in Manufacturer ID:", manufacturer_id)

    bottles = Bottle.query.filter_by(
        manufacturer_id=manufacturer_id
    ).all()

    print("Total Bottles Found:", len(bottles))

    result = []

    for bottle in bottles:
        print(
            bottle.id,
            bottle.bottle_name,
            bottle.manufacturer_id
        )

        result.append({
            "id": bottle.id,
            "bottle_name": bottle.bottle_name,
            "brand": bottle.brand,
            "batch_number": bottle.batch_number,
            "nfc_uid": bottle.nfc_uid
        })

    return result, 200