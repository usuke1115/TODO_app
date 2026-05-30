import { useState, type SubmitEvent } from "react";
import { months } from "../../utils/months";
import { getYears } from "../../utils/years";
import { useEmail } from "./hooks/email";
import { useHurigana } from "./hooks/huriganaName";
import { useMonth } from "./hooks/month";
import { useName } from "./hooks/kanjiName";
import { usePassword } from "./hooks/password";
import { usePasswordForConf } from "./hooks/password_confirm";
import { useSex } from "./hooks/sex";
import { useYear } from "./hooks/year";
import { useNavigate } from "react-router-dom";

function SignupForm() {
  const years: number[] = getYears(1920, 2025);

  const { name, handleKanjiChange } = useName();
  const { hurigana, handleHuriganaChange } = useHurigana();
  const { sex, handleSexChange } = useSex();
  const { email, handleEmailChange } = useEmail();
  const { year, handleYearChange } = useYear();
  const { month, handleMonthChange } = useMonth();
  const { password, handlePassChange } = usePassword();
  const { passwordForConf, handlePassConfirm } = usePasswordForConf();
  const [isSamePass, setIsSamePass] = useState<boolean>(true);
  const navigate = useNavigate();


  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordForConf) {
      setIsSamePass(false);
    } else {
      setIsSamePass(true);
    }

    const userInfo = {
      name: name, 
      hurigana: hurigana, 
      sex: sex, 
      email: email, 
      birthday: {
        year: year, 
        month: month, 
      }, 
      password: password
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
      navigate("/home");
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
              value={name.first}
              name="first"
              placeholder="山田"
              onChange={handleKanjiChange}
              required
            />
            <input
              type="text"
              value={name.last}
              name="last"
              placeholder="太郎"
              onChange={handleKanjiChange}
              required
            />
          </div>
        </div>
    
        <div className="field">
          <label>お名前（フリガナ）※</label>
          <div className="inputs">
            <input
              type="text"
              value={hurigana.first}
              name="first"
              placeholder="ヤマダ"
              onChange={handleHuriganaChange}
              required
            />
            <input
              type="text"
              value={hurigana.last}
              name="last"
              placeholder="タロウ"
              onChange={handleHuriganaChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label>パスワード ※</label>
          <input
           type="password"
           value={password}
           onChange={handlePassChange}
           required
          />
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
           value={email}
           onChange={handleEmailChange}
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
               checked={sex === "male"}
               onChange={handleSexChange}
              />
              男性
            </label>
            <label>
              <input
               type="radio"
               name="sex"
               value='female'
               checked={sex === "female"}
               onChange={handleSexChange}
              />
              女性
            </label>
            <label>
              <input
               type="radio"
               name="sex"
               value='no_answer'
               checked={sex === "no_answer"}
               onChange={handleSexChange}
              />
              回答しない
            </label>
          </div>
        </div>
    
        <div className="field">
          <label>誕生年月 ※</label>
            <div className="inputs">
              <select value={year} onChange={handleYearChange}>
                <option>年</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
              </select>
              <select value={month} onChange={handleMonthChange}>
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
}

export default SignupForm;
