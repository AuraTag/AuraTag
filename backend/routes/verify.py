from flask import Blueprint, request
from database import db
from models.bottle import Bottle
from models.verification_log import VerificationLog
from datetime import datetime

verify_bp = Blueprint("verify", __name__)


# =====================================
# Verify Bottle
# =====================================
@verify_bp.route("/<string:uid>", methods=["GET"])
def verify_bottle(uid):

    print("\n===== VERIFY API CALLED =====")
    print("Bottle UID:", uid)

    bottle = Bottle.query.filter_by(
        nfc_uid=uid
    ).first()

    if not bottle:
        print("Bottle not found!")
        return {
            "genuine": False,
            "message": "Counterfeit Bottle"
        }, 404

    print("Bottle Found:", bottle.bottle_name)

    bottle.verification_count += 1
    bottle.last_verified = datetime.utcnow()

    status = "Opened" if bottle.is_opened else "Sealed"

    print("Creating Verification Log...")

    log = VerificationLog(
        bottle_id=bottle.id,
        status=status,
        ip_address=request.remote_addr,
        user_agent=request.headers.get("User-Agent")
    )

    db.session.add(log)

    print("Saving to database...")
    db.session.commit()

    print("Verification Log Saved Successfully!")

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


# =====================================
# Verification Logs
# =====================================
@verify_bp.route("/logs", methods=["GET"])
def get_verification_logs():

    logs = VerificationLog.query.all()

    print("\n===== FETCHING LOGS =====")
    print("Total Logs:", len(logs))

    result = []

    for log in logs:
        bottle = Bottle.query.get(log.bottle_id)

        result.append({
            "id": log.id,
            "bottle_name": bottle.bottle_name if bottle else "Unknown",
            "brand": bottle.brand if bottle else "Unknown",
            "batch_number": bottle.batch_number if bottle else "Unknown",
            "status": log.status,
            "verified_at": log.verified_at.strftime("%Y-%m-%d %H:%M:%S"),
            "ip_address": log.ip_address,
            "user_agent": log.user_agent
        })

    return result