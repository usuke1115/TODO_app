import { useState, type ChangeEvent } from "react";

export const usePassword = () => {
  const [password, setPassword] = useState("");
  const handlePassChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  return { password, handlePassChange };
}
