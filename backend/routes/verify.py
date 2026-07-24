from flask import Blueprint, request
from models.bottle import Bottle
from models.scan import BottleScan
from database import db
from flask_jwt_extended import jwt_required, get_jwt_identity

verify_bp = Blueprint("verify", __name__)


@verify_bp.route("/<string:nfc_uid>", methods=["GET"])
def verify_bottle(nfc_uid):

    bottle = Bottle.query.filter_by(nfc_uid=nfc_uid).first()

    if bottle:

        # Save Scan History
        scan = BottleScan(
            bottle_id=bottle.id,
            ip_address=request.remote_addr,
            result="genuine"
        )

        db.session.add(scan)
        db.session.commit()

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


@verify_bp.route("/history", methods=["GET"])
@jwt_required()
def scan_history():

    manufacturer_id = int(get_jwt_identity())

    scans = (
        BottleScan.query
        .join(Bottle)
        .filter(Bottle.manufacturer_id == manufacturer_id)
        .order_by(BottleScan.scan_time.desc())
        .all()
    )

    result = []

    for scan in scans:

        bottle = Bottle.query.get(scan.bottle_id)

        result.append({
            "scan_id": scan.id,
            "bottle_name": bottle.bottle_name,
            "brand": bottle.brand,
            "scan_time": scan.scan_time,
            "ip_address": scan.ip_address,
            "result": scan.result
        })

    return result, 200