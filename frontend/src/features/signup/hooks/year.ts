import { useState } from "react";

export const useYear = () => {
  const [year, setYear] = useState<string>("");
  const handleYearChange = (e: any) => {
    setYear(e.target.value);
  }

  return { year, handleYearChange };
}
