import { months } from "../../../utils/months";
import { getYears } from "../../../utils/years";
import { type Form } from "../hooks/types/index";

export const ConfirmStep = ({form}: {form: Form}) => {
  const years: number[] = getYears(1920, 2025);
   return (
        <>
        <form className="form">
            <div className="field">
            <label>お名前 ※</label>
            <div className="inputs">
                <input
                    type="text"
                    disabled
                    value={form.name.first}
                    name="first"
                    placeholder="山田"
                />
                <input
                    type="text"
                    disabled
                    value={form.name.last}
                    name="last"
                    placeholder="太郎"
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
                    disabled
                />
                <input
                    type="text"
                    value={form.hurigana.last}
                    name="last"
                    placeholder="タロウ"
                    disabled
                />
            </div>
            </div>

            <div className="field">
            <label>パスワード ※</label>
                <div className="pass">
                <input
                    type={"password"}
                    value={form.password}
                    className="in"
                    disabled
                />
                </div>
            </div>

            <div className="field">
            <label>メールアドレス ※</label>
            <input
                type="email"
                value={form.email}
                disabled
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
                    disabled
                />
                男性
                </label>
                <label>
                <input
                    type="radio"
                    name="sex"
                    value='female'
                    checked={form.sex === "female"}
                    disabled
                />
                女性
                </label>
                <label>
                <input
                    type="radio"
                    name="sex"
                    value='no_answer'
                    checked={form.sex === "no_answer"}
                    disabled
                />
                回答しない
                </label>
            </div>
            </div>
        
            <div className="field">
            <label>誕生年月 ※</label>
                <div className="inputs">
                <select value={form.year} disabled>
                    <option>年</option>
                    {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <select value={form.month} disabled>
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
