from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import func
from datetime import datetime, timedelta
from sqlalchemy import func, Integer
from models.product import Product
from models.batch import Batch
from models.bottle import Bottle
from models.scan import BottleScan
from models.verification_log import VerificationLog

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/", methods=["GET"])
@jwt_required()
def dashboard():
    manufacturer_id = int(get_jwt_identity())

    # ==========================
    # Basic Counts
    # ==========================
    total_products = Product.query.filter_by(
        manufacturer_id=manufacturer_id
    ).count()

    total_batches = Batch.query.filter_by(
        manufacturer_id=manufacturer_id
    ).count()

    total_bottles = Bottle.query.filter_by(
        manufacturer_id=manufacturer_id
    ).count()

    # ==========================
    # Bottle Statistics
    # ==========================
    opened_bottles = Bottle.query.filter(
        Bottle.manufacturer_id == manufacturer_id,
        Bottle.is_opened == True
    ).count()

    verified_bottles = Bottle.query.filter(
        Bottle.manufacturer_id == manufacturer_id,
        Bottle.verification_count > 0
    ).count()

    # ==========================
    # Scan Statistics
    # ==========================
    scan_stats = (
        BottleScan.query
        .join(Bottle)
        .filter(Bottle.manufacturer_id == manufacturer_id)
        .with_entities(
            func.count(BottleScan.id).label("total"),
            func.sum(
                func.cast(BottleScan.result == "genuine", Integer)
            ).label("genuine"),
            func.sum(
                func.cast(BottleScan.result == "counterfeit", Integer)
            ).label("counterfeit")
        )
        .first()
    )

    total_scans = scan_stats.total or 0
    genuine_scans = scan_stats.genuine or 0
    counterfeit_scans = scan_stats.counterfeit or 0

    # ==========================
    # Verification Statistics
    # ==========================
    total_verifications = (
        VerificationLog.query
        .join(Bottle)
        .filter(Bottle.manufacturer_id == manufacturer_id)
        .count()
    )

    # ==========================
    # Recent Batches
    # ==========================
    recent_batches = (
        Batch.query
        .filter_by(manufacturer_id=manufacturer_id)
        .order_by(Batch.id.desc())
        .limit(5)
        .all()
    )

    recent_batch_list = [
        {
            "id": batch.id,
            "batch_number": batch.batch_number,
            "quantity": batch.quantity,
            "manufacture_date": str(batch.manufacture_date),
            "expiry_date": str(batch.expiry_date)
        }
        for batch in recent_batches
    ]

    # ==========================
    # Recent Bottles
    # ==========================
    recent_bottles = (
        Bottle.query
        .filter_by(manufacturer_id=manufacturer_id)
        .order_by(Bottle.id.desc())
        .limit(5)
        .all()
    )

    recent_bottle_list = [
        {
            "id": bottle.id,
            "bottle_name": bottle.bottle_name,
            "brand": bottle.brand,
            "batch_number": bottle.batch_number,
            "nfc_uid": bottle.nfc_uid,
            "verification_count": bottle.verification_count,
            "is_opened": bottle.is_opened
        }
        for bottle in recent_bottles
    ]

    # ==========================
    # Verification Trend (Last 7 Days)
    # ==========================
    last_7_days = []
    verification_trend = []

    for i in range(6, -1, -1):
        day = datetime.utcnow().date() - timedelta(days=i)

        count = (
            VerificationLog.query
            .join(Bottle)
            .filter(
                Bottle.manufacturer_id == manufacturer_id,
                func.date(VerificationLog.verified_at) == day
            )
            .count()
        )

        last_7_days.append(day.strftime("%a"))
        verification_trend.append(count)

    # ==========================
    # Opened vs Sealed
    # ==========================
    opened_count = Bottle.query.filter(
        Bottle.manufacturer_id == manufacturer_id,
        Bottle.is_opened == True
    ).count()

    sealed_count = Bottle.query.filter(
        Bottle.manufacturer_id == manufacturer_id,
        Bottle.is_opened == False
    ).count()

    # ==========================
    # Brand Distribution
    # ==========================
    brand_stats = (
        Bottle.query
        .filter(Bottle.manufacturer_id == manufacturer_id)
        .with_entities(
            Bottle.brand,
            func.count(Bottle.id)
        )
        .group_by(Bottle.brand)
        .all()
    )

    brand_labels = [row[0] for row in brand_stats]
    brand_counts = [row[1] for row in brand_stats]

    # ==========================
    # Dashboard Response
    # ==========================
    return jsonify({
        "total_products": total_products,
        "total_batches": total_batches,
        "total_bottles": total_bottles,

        "opened_bottles": opened_bottles,
        "verified_bottles": verified_bottles,
        "total_verifications": total_verifications,

        "total_scans": total_scans,
        "genuine_scans": genuine_scans,
        "counterfeit_scans": counterfeit_scans,

        "verification_trend": {
            "labels": last_7_days,
            "data": verification_trend
        },

        "opened_vs_sealed": {
            "labels": ["Opened", "Sealed"],
            "data": [opened_count, sealed_count]
        },

        "brand_distribution": {
            "labels": brand_labels,
            "data": brand_counts
        },

        "recent_batches": recent_batch_list,
        "recent_bottles": recent_bottle_list
    }), 200