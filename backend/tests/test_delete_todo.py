from app.models.users import User
from app.extentions import db
from app.extentions import bcrypt

def test_update_todo(client):
    password = "password"
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    
    user = User(
        name="山田太郎",
        hurigana="ヤマダタロウ",
        email="example@gmail.com",
        sex="male",
        birthyear="2001",
        birthmonth="1",
        password=hashed_password
    )
    
    db.session.add(user)
    db.session.commit()
    
    with client.session_transaction() as session:
        session["user_id"] = 1
    client.post(
        "/todos/", 
        json={
         "name": "sample", 
         "userId": 1   
        }
    )
    
    response = client.delete("/todos/todo_id/1")
    assert response.status_code == 200
