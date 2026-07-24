from flask import Blueprint, request
from models.manufacturer import Manufacturer
from database import db
import bcrypt
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    company_name = data["company_name"]
    email = data["email"]
    password = data["password"]

    existing = Manufacturer.query.filter_by(email=email).first()

    if existing:
        return {
            "message": "Email already exists"
        }, 400

    hashed_password = bcrypt.hashpw(
        password.encode(),
        bcrypt.gensalt()
    ).decode()

    manufacturer = Manufacturer(
        company_name=company_name,
        email=email,
        password_hash=hashed_password
    )

    db.session.add(manufacturer)
    db.session.commit()

    return {
        "message": "Manufacturer registered successfully"
    }, 201


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data["email"]
    password = data["password"]

    manufacturer = Manufacturer.query.filter_by(email=email).first()

    # Debug logs
    print("=" * 50)
    print("Login Request")
    print("Email:", email)
    print("Password:", password)
    print("Manufacturer Found:", manufacturer)

    if manufacturer is None:
        print("Manufacturer not found")
        return {
            "message": "Invalid email or password"
        }, 401

    print("Stored Hash:", manufacturer.password_hash)

    password_match = bcrypt.checkpw(
        password.encode(),
        manufacturer.password_hash.encode()
    )

    print("Password Match:", password_match)
    print("=" * 50)

    if not password_match:
        return {
            "message": "Invalid email or password"
        }, 401

    token = create_access_token(
        identity=str(manufacturer.id)
    )

    return {
        "message": "Login Successful",
        "token": token,
        "company_name": manufacturer.company_name
    }, 200