import { useState, type ChangeEvent } from "react";

export const usePasswordForConf = () => {
  const [passwordForConf, setPasswordForConf] = useState("");
  const handlePassConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordForConf(e.target.value);
  }

  return { passwordForConf, handlePassConfirm };
}
