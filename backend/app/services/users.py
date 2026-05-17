from app.extentions import bcrypt
from app.extentions import db
from app.models.users import User
import typing as t

def get_all() -> list[User]:
    users: list[User] = User.query.all()
    return users

def get_user_by_id(id) -> User:
    user: User = User.query.filter(User.id == id).first()
    return user

def create_user(req) -> User:
    hashed_password = bcrypt.generate_password_hash(req["password"]).decode("utf-8")
    user: User = User(
        name=req["name"]["first"] + req["name"]["last"], 
        hurigana=req["hurigana"]["first"] + req["hurigana"]["last"], 
        email=req["email"], 
        sex=req["sex"], 
        password=hashed_password,
        birthyear=req["birthday"]["year"], 
        birthmonth=req["birthday"]["month"]
    )
    db.session.add(user)
    db.session.commit()
    return user

def authenticate_user(req) -> t.Optional[User]:
    email = req["email"]
    password = req["password"]
    user: t.Optional[User] = User.query.filter(User.email == email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        return user
    else:
        return None
