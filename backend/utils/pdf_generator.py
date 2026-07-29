from io import BytesIO
from datetime import datetime

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate,
    Table,
    TableStyle,
    Paragraph,
)


def generate_inventory_pdf(report):
    """
    report = {
        "manufacturer": manufacturer,
        "bottles": bottles,
        "total_bottles": total_bottles,
        "opened": opened,
        "sealed": sealed,
        "total_verifications": total_verifications
    }
    """

    manufacturer = report["manufacturer"]
    bottles = report["bottles"]
    total_bottles = report["total_bottles"]
    opened = report["opened"]
    sealed = report["sealed"]
    total_verifications = report["total_verifications"]

    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        rightMargin=30,
        leftMargin=30,
        topMargin=30,
        bottomMargin=30,
    )

    styles = getSampleStyleSheet()

    elements = []

    # =====================================================
    # Header
    # =====================================================

    elements.append(
        Paragraph(
            "<font size='24'><b>AuraTag</b></font>",
            styles["Title"],
        )
    )

    elements.append(
        Paragraph(
            "Smart Bottle Authentication Platform",
            styles["Heading2"],
        )
    )

    elements.append(Paragraph("<br/>", styles["Normal"]))

    elements.append(
        Paragraph(
            "<font size='18'><b>Inventory Report</b></font>",
            styles["Heading1"],
        )
    )

    elements.append(
        Paragraph(
            f"Generated On : {datetime.now().strftime('%d-%b-%Y %I:%M %p')}",
            styles["Normal"],
        )
    )

    elements.append(
        Paragraph(
            f"Manufacturer : {manufacturer.company_name}",
            styles["Normal"],
        )
    )

    elements.append(Paragraph("<br/>", styles["Normal"]))

    # =====================================================
    # Summary
    # =====================================================

    elements.append(
        Paragraph("<b>Report Summary</b>", styles["Heading2"])
    )

    summary_data = [
        ["Total Bottles", str(total_bottles)],
        ["Opened Bottles", str(opened)],
        ["Sealed Bottles", str(sealed)],
        ["Total Verifications", str(total_verifications)],
    ]

    summary_table = Table(summary_data, colWidths=[220, 120])

    summary_table.setStyle(
        TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
                ("BACKGROUND", (0, 0), (-1, -1), colors.whitesmoke),
                ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )

    elements.append(summary_table)

    elements.append(Paragraph("<br/>", styles["Normal"]))

    # =====================================================
    # Inventory Table
    # =====================================================

    elements.append(
        Paragraph("<b>Inventory Details</b>", styles["Heading2"])
    )

    table_data = [[
        "Bottle Name",
        "Brand",
        "Batch",
        "Opened",
        "Verifications",
    ]]

    for bottle in bottles:
        table_data.append(
            [
                bottle.bottle_name,
                bottle.brand,
                bottle.batch_number,
                "Yes" if bottle.is_opened else "No",
                str(bottle.verification_count),
            ]
        )

    inventory_table = Table(table_data)

    inventory_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1F2937")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 10),

                ("BACKGROUND", (0, 1), (-1, -1), colors.beige),

                ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),

                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ]
        )
    )

    elements.append(inventory_table)

    # =====================================================
    # Footer
    # =====================================================

    elements.append(Paragraph("<br/>", styles["Normal"]))

    elements.append(
        Paragraph(
            "© 2026 AuraTag | Confidential | Generated Automatically",
            styles["Italic"],
        )
    )

    doc.build(elements)

    pdf = buffer.getvalue()

    buffer.close()

    return pdf