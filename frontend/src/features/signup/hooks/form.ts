import { useState } from "react";
import { type Form, type UpdateFn, initialForm } from "../hooks/types/index";

export const useForm = () => {
  const [form, setForm] = useState<Form>(initialForm);

  const update: UpdateFn = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return { form, update };
}