# import os
# import uuid
# from flask import Blueprint, jsonify, request, current_app
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from werkzeug.utils import secure_filename
# from datetime import datetime
# from app import db
# from app.models.user import User
# from app.models.student import Student
# from app.models.resource import Resource
# from app.models.announcement import Announcement
# from app.models.link import Link
# from app.models.result import Result
# from app.models.payment import Payment
# from app.middleware.roles import admin_required

# admin_bp = Blueprint("admin", __name__)


# # ─── Stats ────────────────────────────────────────────────────────────────────

# @admin_bp.route("/stats", methods=["GET"])
# @jwt_required()
# @admin_required
# def stats():
#     total_students  = Student.query.count()
#     active_students = Student.query.filter_by(status="active").count()
#     total_payments  = db.session.query(
#         db.func.sum(Payment.amount)
#     ).filter_by(status="success").scalar() or 0
#     total_resources = Resource.query.count()
#     return jsonify({
#         "total_students":  total_students,
#         "active_students": active_students,
#         "total_payments":  float(total_payments),
#         "total_resources": total_resources,
#     }), 200


# # ─── Students ─────────────────────────────────────────────────────────────────

# @admin_bp.route("/students", methods=["GET"])
# @jwt_required()
# @admin_required
# def get_students():
#     students = Student.query.join(User).all()
#     return jsonify([s.to_dict() for s in students]), 200


# @admin_bp.route("/students", methods=["POST"])
# @jwt_required()
# @admin_required
# def add_student():
#     from app.models.student import generate_student_code
#     data = request.get_json()
#     user = User(
#         full_name=data["full_name"],
#         email=data["email"],
#         phone=data.get("phone"),
#     )
#     user.set_password(data.get("password", "ChangeMeNow123!"))
#     db.session.add(user)
#     db.session.flush()
#     student = Student(
#         user_id=user.id,
#         class_level=data.get("class_level", "General"),
#         student_code=generate_student_code(),
#     )
#     db.session.add(student)
#     db.session.commit()
#     return jsonify(student.to_dict()), 201


# @admin_bp.route("/students/<int:student_id>", methods=["PATCH"])
# @jwt_required()
# @admin_required
# def update_student(student_id):
#     student = Student.query.get_or_404(student_id)
#     data    = request.get_json()
#     if "status"      in data: student.status      = data["status"]
#     if "class_level" in data: student.class_level = data["class_level"]
#     if "full_name"   in data: student.user.full_name = data["full_name"]
#     db.session.commit()
#     return jsonify(student.to_dict()), 200


# @admin_bp.route("/students/<int:student_id>", methods=["DELETE"])
# @jwt_required()
# @admin_required
# def delete_student(student_id):
#     student = Student.query.get_or_404(student_id)
#     db.session.delete(student)
#     db.session.commit()
#     return jsonify({"message": "Student deleted"}), 200


# # ─── Resources ────────────────────────────────────────────────────────────────

# @admin_bp.route("/resources", methods=["POST"])
# @jwt_required()
# @admin_required
# def upload_resource():
#     file     = request.files.get("file")
#     title    = request.form.get("title")
#     category = request.form.get("category", "General")
#     if not file or not title:
#         return jsonify({"error": "File and title required"}), 400
#     allowed = current_app.config["ALLOWED_EXTENSIONS"]
#     ext     = file.filename.rsplit(".", 1)[-1].lower() if "." in file.filename else ""
#     if ext not in allowed:
#         return jsonify({"error": f"File type .{ext} not allowed"}), 400
#     filename   = secure_filename(f"{datetime.utcnow().timestamp()}_{file.filename}")
#     upload_dir = os.path.join(current_app.config["UPLOAD_FOLDER"], "resources")
#     os.makedirs(upload_dir, exist_ok=True)
#     file.save(os.path.join(upload_dir, filename))
#     resource = Resource(
#         title=title, category=category,
#         file_url=f"/uploads/resources/{filename}", file_type=ext,
#     )
#     db.session.add(resource)
#     db.session.commit()
#     return jsonify(resource.to_dict()), 201


# @admin_bp.route("/resources/<int:resource_id>", methods=["DELETE"])
# @jwt_required()
# @admin_required
# def delete_resource(resource_id):
#     resource = Resource.query.get_or_404(resource_id)
#     db.session.delete(resource)
#     db.session.commit()
#     return jsonify({"message": "Resource deleted"}), 200


# # ─── Announcements ────────────────────────────────────────────────────────────

# @admin_bp.route("/announcements", methods=["POST"])
# @jwt_required()
# @admin_required
# def create_announcement():
#     data = request.get_json()
#     if not data.get("title") or not data.get("content"):
#         return jsonify({"error": "Title and content required"}), 400
#     ann = Announcement(title=data["title"], content=data["content"])
#     db.session.add(ann)
#     db.session.commit()
#     return jsonify(ann.to_dict()), 201


# @admin_bp.route("/announcements/<int:ann_id>", methods=["PATCH"])
# @jwt_required()
# @admin_required
# def update_announcement(ann_id):
#     ann  = Announcement.query.get_or_404(ann_id)
#     data = request.get_json()
#     if "title"   in data: ann.title   = data["title"]
#     if "content" in data: ann.content = data["content"]
#     db.session.commit()
#     return jsonify(ann.to_dict()), 200


# @admin_bp.route("/announcements/<int:ann_id>", methods=["DELETE"])
# @jwt_required()
# @admin_required
# def delete_announcement(ann_id):
#     ann = Announcement.query.get_or_404(ann_id)
#     db.session.delete(ann)
#     db.session.commit()
#     return jsonify({"message": "Deleted"}), 200


# # ─── Links ────────────────────────────────────────────────────────────────────

# @admin_bp.route("/links", methods=["GET"])
# @jwt_required()
# @admin_required
# def get_links():
#     items = Link.query.order_by(Link.created_at.desc()).all()
#     return jsonify([l.to_dict() for l in items]), 200


# @admin_bp.route("/links", methods=["POST"])
# @jwt_required()
# @admin_required
# def create_link():
#     data = request.get_json()
#     link = Link(
#         type=data["type"], title=data["title"], url=data["url"],
#         description=data.get("description"),
#         due_date=datetime.fromisoformat(data["due_date"]) if data.get("due_date") else None,
#     )
#     db.session.add(link)
#     db.session.commit()
#     return jsonify(link.to_dict()), 201


# @admin_bp.route("/links/<int:link_id>", methods=["PATCH"])
# @jwt_required()
# @admin_required
# def update_link(link_id):
#     link = Link.query.get_or_404(link_id)
#     data = request.get_json()
#     for field in ["title", "url", "description"]:
#         if field in data: setattr(link, field, data[field])
#     db.session.commit()
#     return jsonify(link.to_dict()), 200


# @admin_bp.route("/links/<int:link_id>", methods=["DELETE"])
# @jwt_required()
# @admin_required
# def delete_link(link_id):
#     link = Link.query.get_or_404(link_id)
#     db.session.delete(link)
#     db.session.commit()
#     return jsonify({"message": "Deleted"}), 200


# # ─── Results ─────────────────────────────────────────────────────────────────

# @admin_bp.route("/results", methods=["GET"])
# @jwt_required()
# @admin_required
# def get_results():
#     results = Result.query.order_by(Result.uploaded_at.desc()).all()
#     return jsonify([r.to_dict() for r in results]), 200


# @admin_bp.route("/results", methods=["POST"])
# @jwt_required()
# @admin_required
# def upload_result():
#     data   = request.get_json()
#     result = Result(
#         student_id=data["student_id"], subject=data["subject"],
#         term=data.get("term"), score=data.get("score"),
#         grade=data.get("grade"), remarks=data.get("remarks"),
#     )
#     db.session.add(result)
#     db.session.commit()
#     return jsonify(result.to_dict()), 201


# @admin_bp.route("/results/<int:result_id>", methods=["DELETE"])
# @jwt_required()
# @admin_required
# def delete_result(result_id):
#     result = Result.query.get_or_404(result_id)
#     db.session.delete(result)
#     db.session.commit()
#     return jsonify({"message": "Deleted"}), 200


# # ─── Payments ────────────────────────────────────────────────────────────────

# @admin_bp.route("/payments", methods=["GET"])
# @jwt_required()
# @admin_required
# def get_payments():
#     payments = Payment.query.order_by(Payment.created_at.desc()).all()
#     return jsonify([p.to_dict() for p in payments]), 200


# @admin_bp.route("/payments", methods=["POST"])
# @jwt_required()
# @admin_required
# def record_manual_payment():
#     data    = request.get_json()
#     payment = Payment(
#         student_id  = data["student_id"],
#         amount      = data["amount"],
#         reference   = data.get("reference", str(uuid.uuid4())),
#         status      = "success",
#         method      = "manual",
#         description = data.get("description"),
#         paid_at     = datetime.utcnow(),
#     )
#     db.session.add(payment)
#     db.session.commit()
#     return jsonify(payment.to_dict()), 201
