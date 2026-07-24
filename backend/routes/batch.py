from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from database import db
from models.batch import Batch
from models.bottle import Bottle
from models.product import Product

import uuid

batch_bp = Blueprint("batch", __name__)


@batch_bp.route("/generate", methods=["POST"])
@jwt_required()
def generate_batch():

    data = request.get_json()
    manufacturer_id = int(get_jwt_identity())

    product = Product.query.filter_by(
        id=data["product_id"],
        manufacturer_id=manufacturer_id
    ).first()

    if not product:
        return {"message": "Product not found"}, 404

    batch = Batch(
        manufacturer_id=manufacturer_id,
        product_id=product.id,
        batch_number=data["batch_number"],
        quantity=data["quantity"],
        manufacture_date=data["manufacture_date"],
        expiry_date=data["expiry_date"]
    )

    db.session.add(batch)
    db.session.commit()

    bottles = []

    for _ in range(data["quantity"]):
        bottle = Bottle(
            bottle_name=product.product_name,
            brand=product.brand,
            batch_number=batch.batch_number,
            manufacture_date=batch.manufacture_date,
            expiry_date=batch.expiry_date,
            manufacturer_id=manufacturer_id,
            batch_id=batch.id,
            nfc_uid=str(uuid.uuid4())
        )

        bottles.append(bottle)

    db.session.bulk_save_objects(bottles)
    db.session.commit()

    return {
        "message": "Batch Generated Successfully",
        "batch_id": batch.id,
        "bottles_created": len(bottles)
    }, 201


@batch_bp.route("/", methods=["GET"])
@jwt_required()
def get_batches():

    manufacturer_id = int(get_jwt_identity())

    batches = Batch.query.filter_by(
        manufacturer_id=manufacturer_id
    ).all()

    result = []

    for batch in batches:
        result.append({
            "id": batch.id,
            "batch_number": batch.batch_number,
            "product_name": batch.product.product_name,
            "brand": batch.product.brand,
            "quantity": batch.quantity,
            "manufacture_date": batch.manufacture_date.strftime("%Y-%m-%d"),
            "expiry_date": batch.expiry_date.strftime("%Y-%m-%d")
        })

    return result, 200