from app.models.users import User
from app.extentions import db
from app.extentions import bcrypt


def test_signup(client):
    user = {
        "name": {
            "first": "山田", 
            "last": "太郎"
        },  
        "hurigana": {
            "first": "ヤマダ", 
            "last": "タロウ"
        },
        "email": "example@gmail.com",
        "sex": "male",
        "birthday": {
            "year": "2001", 
            "month": "1"
        },
        "password": "password"
    }
            
    response = client.post("/users/signup", json=user)
    assert response.status_code == 201

def test_login(client):
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
    response = client.get("/users/me")
    assert response.status_code == 200

def test_login_fail(client):
    response = client.get("/users/me")
    assert response.status_code == 400

def test_logout(client):
    with client.session_transaction() as session:
        session["user_id"] = 1
    response = client.post("/users/logout")
    assert response.status_code == 200

def test_logout_fail(client):
    response = client.post("/users/logout")
    assert response.status_code == 401
