from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from database import db

from routes.auth import auth_bp
from routes.bottle import bottle_bp
from routes.verify import verify_bp

from models import Manufacturer, Bottle

app = Flask(__name__)

app.config.from_object(Config)

jwt = JWTManager(app)

CORS(app)

db.init_app(app)

# --------------------------
# Register Blueprints
# --------------------------

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(bottle_bp, url_prefix="/api/bottles")
app.register_blueprint(verify_bp, url_prefix="/api/verify")

# --------------------------
# Create Database Tables
# --------------------------

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return {
        "status": "running",
        "project": "AuraTag Backend"
    }

if __name__ == "__main__":
    app.run(debug=True)