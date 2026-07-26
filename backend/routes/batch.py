from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from database import db
from models.batch import Batch
from models.bottle import Bottle
from models.product import Product

import uuid

batch_bp = Blueprint("batch", __name__)


# ==============================
# Generate Batch + Bottles
# ==============================
@batch_bp.route("/generate", methods=["POST"])
@jwt_required()
def generate_batch():

    try:
        data = request.get_json()

        print("Received Data:", data)

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

        print("Batch Saved:", batch.id)

        bottles = []

        for _ in range(int(data["quantity"])):
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

        print("Bottles Created:", len(bottles))

        return {
            "message": "Batch Generated Successfully",
            "batch_id": batch.id,
            "bottles_created": len(bottles)
        }, 201

    except Exception as e:
        db.session.rollback()
        print("BATCH ERROR:", e)

        return {
            "error": str(e)
        }, 500


# ==============================
# Get All Batches
# ==============================
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
            "product_id": batch.product_id,
            "product_name": batch.product.product_name,
            "brand": batch.product.brand,
            "quantity": batch.quantity,
            "manufacture_date": batch.manufacture_date.strftime("%Y-%m-%d"),
            "expiry_date": batch.expiry_date.strftime("%Y-%m-%d")
        })

    return result, 200


# ==============================
# Get Single Batch
# ==============================
@batch_bp.route("/<int:id>", methods=["GET"])
@jwt_required()
def get_batch(id):

    manufacturer_id = int(get_jwt_identity())

    batch = Batch.query.filter_by(
        id=id,
        manufacturer_id=manufacturer_id
    ).first()

    if not batch:
        return {"message": "Batch not found"}, 404

    return {
        "id": batch.id,
        "batch_number": batch.batch_number,
        "product_id": batch.product_id,
        "product_name": batch.product.product_name,
        "brand": batch.product.brand,
        "quantity": batch.quantity,
        "manufacture_date": batch.manufacture_date.strftime("%Y-%m-%d"),
        "expiry_date": batch.expiry_date.strftime("%Y-%m-%d")
    }, 200


# ==============================
# Update Batch
# ==============================
@batch_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_batch(id):

    manufacturer_id = int(get_jwt_identity())

    batch = Batch.query.filter_by(
        id=id,
        manufacturer_id=manufacturer_id
    ).first()

    if not batch:
        return {"message": "Batch not found"}, 404

    data = request.get_json()

    batch.batch_number = data.get("batch_number", batch.batch_number)
    batch.quantity = data.get("quantity", batch.quantity)
    batch.manufacture_date = data.get("manufacture_date", batch.manufacture_date)
    batch.expiry_date = data.get("expiry_date", batch.expiry_date)

    db.session.commit()

    return {
        "message": "Batch updated successfully"
    }, 200


# ==============================
# Delete Batch
# ==============================
@batch_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_batch(id):

    manufacturer_id = int(get_jwt_identity())

    batch = Batch.query.filter_by(
        id=id,
        manufacturer_id=manufacturer_id
    ).first()

    if not batch:
        return {"message": "Batch not found"}, 404

    Bottle.query.filter_by(batch_id=batch.id).delete()

    db.session.delete(batch)
    db.session.commit()

    return {
        "message": "Batch deleted successfully"
    }, 200