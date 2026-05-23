from flask import Blueprint
from flask import jsonify
from flask import request
from app.schemas.todos import TodoValidator
from app.services.todos import create_todo
from app.services.todos import delete_todo
from app.services.todos import edit_todo
from app.services.todos import fetch_all_todos

todos_bp = Blueprint("todos_bp", __name__)

@todos_bp("/")
def get_all_todos():
    todos = fetch_all_todos()
    return jsonify([todo.to_dict() for todo in todos]), 200

@todos_bp.post("/")
def create_new_todo():
    try:
        req = request.get_json()
        data = TodoValidator(**req)
        todo = data.model_dump()
        name, user_id = todo["name"], todo["userId"]
        new_todo = create_todo(name=name, user_id=user_id)
        return jsonify(new_todo.to_dict()), 201
    except Exception:
        return jsonify({
            "message": "Fail to create new Todo"
        }), 400

@todos_bp.put("/todo_id/<int:todo_id>")
def update_todo(todo_id):
    req = request.get_json()
    name = req["name"]
    todo = edit_todo(todo_id, name)
    return jsonify(todo.to_dict()), 200

@todos_bp.delete("/todo_id/<int:todo_id>")
def remove_todo(todo_id):
    is_deletion_succuess = delete_todo(todo_id)
    if is_deletion_succuess:
        return jsonify({
            "message": f"Deleted todo succuessfully"
        }), 200
    return jsonify({
        "message": "Fail to delete todo"
    })
