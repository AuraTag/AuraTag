from flask import Blueprint, request
from models.manufacturer import Manufacturer
from database import db
import bcrypt
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data["email"]
    password = data["password"]

    manufacturer = Manufacturer.query.filter_by(email=email).first()

    if manufacturer is None:
        return {
            "message": "Invalid email or password"
        }, 401

    if not bcrypt.checkpw(
        password.encode(),
        manufacturer.password_hash.encode()
    ):
        return {
            "message": "Invalid email or password"
        }, 401

    token = create_access_token(identity=str(manufacturer.id))

    return {
        "message": "Login Successful",
        "token": token,
        "company_name": manufacturer.company_name
    }, 200