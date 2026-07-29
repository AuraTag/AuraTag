from flask import Blueprint, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from io import BytesIO

from services.report_service import get_inventory
from utils.pdf_generator import generate_inventory_pdf

reports_bp = Blueprint("reports", __name__)


@reports_bp.route("/inventory/pdf", methods=["GET"])
@jwt_required()
def inventory_pdf():
    manufacturer_id = int(get_jwt_identity())

    report_data = get_inventory(manufacturer_id)

    pdf = generate_inventory_pdf(report_data)

    return send_file(
        BytesIO(pdf),
        mimetype="application/pdf",
        as_attachment=True,
        download_name="AuraTag_Inventory_Report.pdf",
    )