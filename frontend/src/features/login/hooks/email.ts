import { useState, type ChangeEvent } from "react";

export const useEmail = () => {
  const [email, setEmail] = useState<string>("");
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  return { email, handleEmailChange };
}
