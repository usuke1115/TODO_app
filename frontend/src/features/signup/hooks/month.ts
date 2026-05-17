import { useState } from "react";

export const useMonth = () => {
  const [month, setMonth] = useState<string>("");
  const handleMonthChange = (e: any) => {
    setMonth(e.target.value);
  }

  return { month, handleMonthChange };
}
