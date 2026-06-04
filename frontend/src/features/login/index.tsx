import { useState, type SubmitEvent } from "react";
import { useEmail } from "./hooks/email";
import { usePassword } from "./hooks/password";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { email, handleEmailChange } = useEmail();
  const { password, handlePassChange } = usePassword();
  const navigate = useNavigate();

  const [userId, _] = useState();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userInfo = {
      email: email, 
      password: password
    };

    await fetch("http://localhost:5000/users/login", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      }, 
      credentials: "include", 
      body: JSON.stringify(userInfo)
    }).then(res => res.json())
      .then(data => {
        if (data.id) {
          navigate("/home", {
            state: {
              toast: "ログインに成功しました"
            }
          });
          localStorage.setItem("userId", data.id);
        }
      })
      .catch(err => {
        console.error("Error:", err);
      });
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label>パスワード ※</label>
          <input
           type="password"
           value={password}
           onChange={handlePassChange}
           placeholder="パスワードを入力して下さい"
           required
           style={{ width: "320px" }}
          />
        </div>

        <div className="field">
          <label>メールアドレス ※</label>
          <input
           type="email"
           value={email}
           onChange={handleEmailChange}
           placeholder="メールアドレスを入力して下さい"
           required
          />
        </div>
        <input type='submit' value='ログイン' />
        {
          userId && (
            <p>Logined at: {userId}</p>
          )
        }
      </form>
    </>
  )
}

export default LoginForm;
