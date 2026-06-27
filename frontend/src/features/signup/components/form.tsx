import { useState, type SubmitEvent } from "react";
import { months } from "../../../utils/months";
import { getYears } from "../../../utils/years";
import { useForm } from "../hooks/form";
import { usePasswordForConf } from "./../hooks/password_confirm";
import { useNavigate } from "react-router-dom";
import { type Sex } from "../hooks/types/index";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const RegisterForm =  () => {
  const years: number[] = getYears(1920, 2025);

  const { passwordForConf, handlePassConfirm } = usePasswordForConf();
  const { form, update } = useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [isSamePass, setIsSamePass] = useState<boolean>(true);
  const navigate = useNavigate();

  const togglePassword = () => {
    setVisible(v => !v);
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== passwordForConf) {
      setIsSamePass(false);
    } else {
      setIsSamePass(true);
    }

    const userInfo = {
      name: form.name, 
      hurigana: form.hurigana, 
      sex: form.sex, 
      email: form.email, 
      birthday: {
        year: form.year, 
        month: form.month, 
      }, 
      password: form.password,
    };

    try {
      const response = await fetch("http://localhost:5000/users/signup", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        }, 
        credentials: "include", 
        body: JSON.stringify(userInfo)
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      await response.json();
      navigate("/home", {
        state: {
          toast: "ログインに成功しました"
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
    return (
        <>
        <form className="form" onSubmit={handleSubmit}>
            <div className="field">
            <label>お名前 ※</label>
            <div className="inputs">
                <input
                type="text"
                value={form.name.first}
                name="first"
                placeholder="山田"
                onChange={(e) => update("name", {
                  ...form.name,
                  first: e.target.value,
                })}
                required
                />
                <input
                type="text"
                value={form.name.last}
                name="last"
                placeholder="太郎"
                onChange={(e) => update("name", {
                  ...form.name,
                  last: e.target.value,
                })}
                required
                />
            </div>
            </div>
        
            <div className="field">
            <label>お名前（フリガナ）※</label>
            <div className="inputs">
                <input
                type="text"
                value={form.hurigana.first}
                name="first"
                placeholder="ヤマダ"
                onChange={(e) => update("hurigana", {
                  ...form.hurigana,
                  first: e.target.value,
                })}
                required
                />
                <input
                type="text"
                value={form.hurigana.last}
                name="last"
                placeholder="タロウ"
                onChange={(e) => update("hurigana", {
                  ...form.hurigana,
                  last: e.target.value,
                })}
                required
                />
            </div>
            </div>

            <div className="field">
            <label>パスワード ※</label>
                <div className="pass">
                <input
                    type={visible ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    required
                    className="in"
                />
                <span onClick={togglePassword} className="pass-icon">
                    {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </span>
                </div>
            </div>

            <div className="field">
            <label>パスワード（確認用） ※</label>
            <input
            type="password"
            value={passwordForConf}
            onChange={handlePassConfirm}
            required
            />
            </div>
            {isSamePass ? "" : "パスワードが一致しません"}

            <div className="field">
            <label>メールアドレス ※</label>
            <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
            />
            </div>
        
            <div className="field">
            <label>性別</label>
            <div className="radioGroup">
                <label>
                <input
                type="radio"
                name="sex"
                value='male'
                checked={form.sex === "male"}
                onChange={(e) => update("sex", e.target.value as Sex)}
                />
                男性
                </label>
                <label>
                <input
                type="radio"
                name="sex"
                value='female'
                checked={form.sex === "female"}
                onChange={(e) => update("sex", e.target.value as Sex)}
                />
                女性
                </label>
                <label>
                <input
                type="radio"
                name="sex"
                value='no_answer'
                checked={form.sex === "no_answer"}
                onChange={(e) => update("sex", e.target.value as Sex)}
                />
                回答しない
                </label>
            </div>
            </div>
        
            <div className="field">
            <label>誕生年月 ※</label>
                <div className="inputs">
                <select value={form.year} onChange={(e) => update("year", e.target.value)}>
                    <option>年</option>
                    {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <select value={form.month} onChange={(e) => update("month", e.target.value)}>
                    <option>月</option>
                    {months.map((month) => (
                        <option key={month} value={month}>{month}</option>
                    ))}
                </select>
                </div>
            </div>
            <input type='submit' value='アカウントを作成' />
        </form>
        </>
    )
};
