from datetime import datetime
import typing as t
from zoneinfo import ZoneInfo
from app.extentions import db

class Todo(db.Model):
    __tablename__ = "todos"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    is_completed = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

    def to_dict(self) -> dict[str, t.Any]:
        return {
            "id": self.id, 
            "user_id": self.user_id, 
            "name": self.name, 
            "is_completed": self.is_completed, 
            "created_at": self.created_at.astimezone(ZoneInfo("Asia/Tokyo")).replace(microsecond=0).isoformat(), 
            "updated_at": self.updated_at.astimezone(ZoneInfo("Asia/Tokyo")).replace(microsecond=0).isoformat()
        }
