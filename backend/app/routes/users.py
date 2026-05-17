from flask import Blueprint
from flask import jsonify
from flask import request
from flask import session
from app.services.users import authenticate_user
from app.services.users import create_user
from app.services.users import get_all
from app.services.users import get_user_by_id

users_bp: Blueprint = Blueprint("users_bp", __name__)

@users_bp.get("/")
def get_all_users():
    users = get_all()
    return jsonify([user.to_dict() for user in users]), 200

@users_bp.post("/signup")
def create_new_user():
    user = request.get_json()
    try:
        new_user = create_user(user)
        return jsonify(new_user.to_dict()), 201
    except Exception as e:
        return jsonify({
            "message": "Fail to create new user"
        }), 400

@users_bp.post("/login")
def login():
    req = request.get_json()
    user = authenticate_user(req)
    if user:
        session["user_id"] = user.id
        return jsonify(user.to_dict()), 200
    return jsonify({
        "error": "Invalid credentials"
    }), 401

@users_bp.get("/me")
def profile():
    if "user_id" not in session:
        return jsonify({
            "message": "You are not logined."
        }), 400
    
    id = session["user_id"]
    user = get_user_by_id(id).to_dict()
    return jsonify({
        "id": f"{user['id']}", 
        "name": f"{user['name']}"
    }), 200

@users_bp.post("/logout")
def logout():
    if "user_id" not in session:
        return jsonify({
            "message": "Not loged in"
        }), 401
    
    session.clear()
    return jsonify({
        "message": "Logout successful"
    }), 200
