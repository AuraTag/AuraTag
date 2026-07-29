from datetime import datetime

from database import db
from models.bottle import Bottle
from models.verification_log import VerificationLog


def verify_bottle(nfc_uid, ip_address=None, user_agent=None):
    """
    Verify a bottle using its NFC UID.
    """

    bottle = Bottle.query.filter_by(nfc_uid=nfc_uid).first()

    # Bottle not found
    if not bottle:
        return {
            "success": False,
            "status": "counterfeit",
            "message": "Bottle not found."
        }, 404

    # Update verification statistics
    bottle.verification_count += 1
    bottle.last_verified = datetime.utcnow()

    # Determine bottle status
    status = "opened" if bottle.is_opened else "genuine"

    # Create verification log
    log = VerificationLog(
        bottle_id=bottle.id,
        status=status,
        ip_address=ip_address,
        user_agent=user_agent
    )

    db.session.add(log)
    db.session.commit()

    return {
        "success": True,
        "status": status,
        "message": (
            "Bottle is genuine."
            if status == "genuine"
            else "Bottle has already been opened."
        ),
        "bottle": {
            "id": bottle.id,
            "name": bottle.bottle_name,
            "brand": bottle.brand,
            "batch_number": bottle.batch_number,
            "manufacture_date": bottle.manufacture_date.strftime("%Y-%m-%d"),
            "expiry_date": bottle.expiry_date.strftime("%Y-%m-%d"),
            "opened": bottle.is_opened,
            "opened_at": (
                bottle.opened_at.strftime("%Y-%m-%d %H:%M:%S")
                if bottle.opened_at
                else None
            ),
            "verification_count": bottle.verification_count,
            "last_verified": bottle.last_verified.strftime("%Y-%m-%d %H:%M:%S"),
            "nfc_uid": bottle.nfc_uid
        }
    }, 200