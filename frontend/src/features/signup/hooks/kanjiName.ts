import { useState, type ChangeEvent } from "react";
import type { Name } from "./types";

export const useName = () => {
  const [name, setName] = useState<Name>({
    first: "",
    last: ""
  });

  const handleKanjiChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setName((prev: Name) => ({
      ...prev, 
      [name as keyof Name]: value
    }));
  }

  return { name, handleKanjiChange };
};
