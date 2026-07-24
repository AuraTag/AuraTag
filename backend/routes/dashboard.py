from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import func
from database import db

from models.bottle import Bottle
from models.scan import BottleScan

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/", methods=["GET"])
@jwt_required()
def dashboard():

    manufacturer_id = int(get_jwt_identity())

    # Total Bottles
    total_bottles = Bottle.query.filter_by(
        manufacturer_id=manufacturer_id
    ).count()

    # Total Scans
    total_scans = (
        BottleScan.query
        .join(Bottle)
        .filter(Bottle.manufacturer_id == manufacturer_id)
        .count()
    )

    # Genuine Scans
    genuine_scans = (
        BottleScan.query
        .join(Bottle)
        .filter(
            Bottle.manufacturer_id == manufacturer_id,
            BottleScan.result == "genuine"
        )
        .count()
    )

    # Counterfeit Scans
    counterfeit_scans = (
        BottleScan.query
        .join(Bottle)
        .filter(
            Bottle.manufacturer_id == manufacturer_id,
            BottleScan.result == "counterfeit"
        )
        .count()
    )

    # Recent Bottles
    recent_bottles = Bottle.query.filter_by(
        manufacturer_id=manufacturer_id
    ).order_by(Bottle.id.desc()).limit(5).all()

    recent = []

    for bottle in recent_bottles:
        recent.append({
            "id": bottle.id,
            "bottle_name": bottle.bottle_name,
            "brand": bottle.brand,
            "batch_number": bottle.batch_number,
            "nfc_uid": bottle.nfc_uid
        })

    return {
        "total_bottles": total_bottles,
        "total_scans": total_scans,
        "genuine_scans": genuine_scans,
        "counterfeit_scans": counterfeit_scans,
        "recent_bottles": recent
    }, 200