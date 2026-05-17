import { useState, type ChangeEvent } from "react";
import type { Sex } from "./types";

export const useSex = () => {
  const [sex, setSex] = useState<Sex>("male");
  const handleSexChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSex(e.target.value as Sex);
  }

  return { sex, handleSexChange };
}

  