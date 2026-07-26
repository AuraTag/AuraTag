from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import func

from models.product import Product
from models.batch import Batch
from models.bottle import Bottle
from models.scan import BottleScan

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/", methods=["GET"])
@jwt_required()
def dashboard():
    manufacturer_id = int(get_jwt_identity())

    # 1. Base counts (Independent tables)
    total_products = Product.query.filter_by(manufacturer_id=manufacturer_id).count()
    total_batches = Batch.query.filter_by(manufacturer_id=manufacturer_id).count()
    total_bottles = Bottle.query.filter_by(manufacturer_id=manufacturer_id).count()

    # 2. Optimized Scans Aggregation (One query instead of three)
    scan_stats = (
        BottleScan.query
        .join(Bottle)
        .filter(Bottle.manufacturer_id == manufacturer_id)
        .with_entities(
            func.count(BottleScan.id).label("total"),
            func.sum(func.cast(BottleScan.result == "genuine", int)).label("genuine"),
            func.sum(func.cast(BottleScan.result == "counterfeit", int)).label("counterfeit")
        )
        .first()
    )

    # Handle case where there are no scans yet
    total_scans = scan_stats.total or 0
    genuine_scans = scan_stats.genuine or 0
    counterfeit_scans = scan_stats.counterfeit or 0

    # 3. Recent Batches (List comprehension is cleaner than manual loops)
    recent_batches = (
        Batch.query
        .filter_by(manufacturer_id=manufacturer_id)
        .order_by(Batch.id.desc())
        .limit(5)
        .all()
    )
    
    recent_batch_list = [{
        "id": b.id,
        "batch_number": b.batch_number,
        "quantity": b.quantity,
        "manufacture_date": str(b.manufacture_date),
        "expiry_date": str(b.expiry_date)
    } for b in recent_batches]

    # 4. Recent Bottles
    recent_bottles = (
        Bottle.query
        .filter_by(manufacturer_id=manufacturer_id)
        .order_by(Bottle.id.desc())
        .limit(5)
        .all()
    )
    
    recent_bottle_list = [{
        "id": b.id,
        "bottle_name": b.bottle_name,
        "brand": b.brand,
        "batch_number": b.batch_number,
        "nfc_uid": b.nfc_uid
    } for b in recent_bottles]

    # 5. Return explicit JSON response
    return jsonify({
        "total_products": total_products,
        "total_batches": total_batches,
        "total_bottles": total_bottles,
        "total_scans": total_scans,
        "genuine_scans": genuine_scans,
        "counterfeit_scans": counterfeit_scans,
        "recent_batches": recent_batch_list,
        "recent_bottles": recent_bottle_list
    }), 200