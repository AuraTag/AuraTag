from models.bottle import Bottle
from models.manufacturer import Manufacturer


def get_inventory(manufacturer_id):

    bottles = (
        Bottle.query
        .filter_by(manufacturer_id=manufacturer_id)
        .order_by(Bottle.id)
        .all()
    )

    manufacturer = Manufacturer.query.get(manufacturer_id)

    total_bottles = len(bottles)

    opened = sum(1 for b in bottles if b.is_opened)

    sealed = total_bottles - opened

    total_verifications = sum(
        b.verification_count for b in bottles
    )

    return {
        "manufacturer": manufacturer,
        "bottles": bottles,
        "total_bottles": total_bottles,
        "opened": opened,
        "sealed": sealed,
        "total_verifications": total_verifications,
    }