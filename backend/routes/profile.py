from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from database import db
from models.manufacturer import Manufacturer

profile_bp = Blueprint("profile", __name__)


@profile_bp.route("/", methods=["GET"])
@jwt_required()
def get_profile():
    manufacturer_id = int(get_jwt_identity())

    manufacturer = Manufacturer.query.get(manufacturer_id)

    if not manufacturer:
        return jsonify({"message": "Manufacturer not found"}), 404

    return jsonify({
        "id": manufacturer.id,
        "company_name": manufacturer.company_name,
        "email": manufacturer.email,
        "phone": manufacturer.phone,
        "gst_number": manufacturer.gst_number,
        "license_number": manufacturer.license_number,
        "address": manufacturer.address,
        "city": manufacturer.city,
        "state": manufacturer.state,
        "country": manufacturer.country,
        "website": manufacturer.website,
        "logo_url": manufacturer.logo_url
    }), 200


@profile_bp.route("/", methods=["PUT"])
@jwt_required()
def update_profile():
    manufacturer_id = int(get_jwt_identity())

    manufacturer = Manufacturer.query.get(manufacturer_id)

    if not manufacturer:
        return jsonify({"message": "Manufacturer not found"}), 404

    data = request.get_json()

    manufacturer.company_name = data.get(
        "company_name",
        manufacturer.company_name
    )

    manufacturer.phone = data.get(
        "phone",
        manufacturer.phone
    )

    manufacturer.gst_number = data.get(
        "gst_number",
        manufacturer.gst_number
    )

    manufacturer.license_number = data.get(
        "license_number",
        manufacturer.license_number
    )

    manufacturer.address = data.get(
        "address",
        manufacturer.address
    )

    manufacturer.city = data.get(
        "city",
        manufacturer.city
    )

    manufacturer.state = data.get(
        "state",
        manufacturer.state
    )

    manufacturer.country = data.get(
        "country",
        manufacturer.country
    )

    manufacturer.website = data.get(
        "website",
        manufacturer.website
    )

    manufacturer.logo_url = data.get(
        "logo_url",
        manufacturer.logo_url
    )

    db.session.commit()

    return jsonify({
        "message": "Profile updated successfully"
    }), 200
