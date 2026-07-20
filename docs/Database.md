# Database Design

## manufacturers

| Field | Type |
|--------|------|
| id | INT |
| company_name | VARCHAR |
| email | VARCHAR |
| password_hash | VARCHAR |
| created_at | DATETIME |

---

## bottles

| Field | Type |
|--------|------|
| id | INT |
| bottle_name | VARCHAR |
| brand | VARCHAR |
| batch_number | VARCHAR |
| manufacture_date | DATE |
| expiry_date | DATE |
| nfc_uid | VARCHAR |
| manufacturer_id | INT |
| created_at | DATETIME |

---

Relationship

One Manufacturer

↓

Many Bottles