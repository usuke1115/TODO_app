import { useState } from "react";
import { type Form, initialForm } from "../hooks/types/index";

export const useForm = () => {
  const [form, setForm] = useState<Form>(initialForm);

  const update = <K extends keyof Form>(
    key: K,
    value: Form[K]
  ) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return { form, update };
}