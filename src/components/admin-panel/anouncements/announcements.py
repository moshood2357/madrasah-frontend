# from flask import Blueprint, jsonify
# from flask_jwt_extended import jwt_required
# from app.models.announcement import Announcement

# announcements_bp = Blueprint("announcements", __name__)


# @announcements_bp.route("/", methods=["GET"])
# @jwt_required()
# def get_announcements():
#     items = Announcement.query.order_by(Announcement.created_at.desc()).all()
#     return jsonify([a.to_dict() for a in items]), 200
