from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from database import db
from models.product import Product

product_bp = Blueprint("product", __name__)


@product_bp.route("/", methods=["POST"])
@jwt_required()
def create_product():

    data = request.get_json()

    manufacturer_id = int(get_jwt_identity())

    product = Product(
        manufacturer_id=manufacturer_id,
        product_name=data["product_name"],
        brand=data["brand"],
        category=data["category"],
        volume=data["volume"],
        alcohol_percentage=data["alcohol_percentage"],
        description=data.get("description", "")
    )

    db.session.add(product)
    db.session.commit()

    return {
        "message": "Product created successfully",
        "product_id": product.id
    }, 201


@product_bp.route("/", methods=["GET"])
@jwt_required()
def get_products():

    manufacturer_id = int(get_jwt_identity())

    products = Product.query.filter_by(
        manufacturer_id=manufacturer_id
    ).all()

    result = []

    for product in products:

        result.append({
            "id": product.id,
            "product_name": product.product_name,
            "brand": product.brand,
            "category": product.category,
            "volume": product.volume,
            "alcohol_percentage": product.alcohol_percentage
        })

    return result, 200