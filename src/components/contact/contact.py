# contact.py
# Public endpoint — no JWT required
# Receives contact form submissions and emails admin

from flask import Blueprint, request, jsonify
from app.utils.email import send_contact_notification

contact_bp = Blueprint("contact", __name__)


@contact_bp.route("/", methods=["POST"])
def submit_contact():
    data = request.get_json()

    required = ["full_name", "email", "subject", "message"]
    if not all(k in data and data[k] for k in required):
        return jsonify({"error": "Please fill in all required fields."}), 400

    # Basic email format check
    if "@" not in data["email"]:
        return jsonify({"error": "Invalid email address."}), 400

    send_contact_notification(data)

    return jsonify({"message": "Message received. We'll be in touch soon."}), 200
