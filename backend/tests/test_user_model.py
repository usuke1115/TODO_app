from app.models.users import User
from app.extentions import db
from app.extentions import bcrypt

def test_create_user(client):
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
    
    response = client.post(
        "/users/login", 
        json={
            "name": "山田太郎",
            "hurigana": "ヤマダタロウ",
            "email": "example@gmail.com",
            "sex": "male",
            "birthyear": "2001",
            "birthmonth": "1",
            "password": "password"
        }
    )
    assert response.status_code == 200
