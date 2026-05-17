import { useState, type ChangeEvent } from "react";
import type { Name } from "./types";

export const useHurigana = () => {
  const [hurigana, setHurigana] = useState<Name>({
    first: "", 
    last: ""
  });

  const handleHuriganaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setHurigana((prev: Name) => ({
      ...prev, 
      [name as keyof Name]: value
    }));
  }

  return { hurigana, handleHuriganaChange };
};
