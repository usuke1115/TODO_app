from datetime import datetime
import typing as t
from zoneinfo import ZoneInfo
from app.extentions import db

class User(db.Model):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    hurigana = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(200), nullable=False, unique=True)
    sex = db.Column(db.String(100), nullable=False)
    birthyear = db.Column(db.String(5), nullable=False)
    birthmonth = db.Column(db.String(5), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    todo = db.relationship("Todo")
    
    def to_dict(self) -> dict[str, t.Any]:
        return {
            "id": self.id, 
            "name": self.name, 
            "hurigana": self.hurigana, 
            "email": self.email, 
            "password": self.password, 
            "birthyear": self.birthyear, 
            "birthmonth": self.birthmonth, 
            "sex": self.sex, 
            "created_at": self.created_at.astimezone(ZoneInfo("Asia/Tokyo")).replace(microsecond=0).isoformat()
        }
