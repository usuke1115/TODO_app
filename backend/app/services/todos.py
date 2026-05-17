from app.extentions import db
from app.models.todos import Todo
from werkzeug.exceptions import NotFound
import datetime
# from sqlalchemy.exc import SQLAlchemyError

def fetch_all_todos() -> list[Todo]:
    todos = Todo.query.all()
    return todos

def create_todo(name: str, user_id: int) -> Todo:
    todo = Todo(name=name, user_id=user_id)
    db.session.add(todo)
    db.session.commit()
    return todo

def edit_todo(todo_id: int, name: str) -> Todo:
    todo = (
        db.session.query(Todo)
        .filter_by(id=todo_id)
        .with_for_update()
        .first()
    )
    if todo is None:
        raise NotFound("Todo is not found.")
    todo.name = name
    db.session.commit()
    return todo

def delete_todo(id: int) -> bool:
    todo = db.session.get(Todo, id)
    
    if not todo:
        return False
    
    try:
        db.session.delete(todo)
        db.session.commit()
        return True
    # except SQLAlchemyError:
    except Exception as e:
        db.session.rollback()
        return False
