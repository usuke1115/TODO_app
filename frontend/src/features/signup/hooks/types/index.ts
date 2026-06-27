export type Name = {
  first: string;
  last: string;
};

export type Sex = "male" | "female" | "no_answer";

export type Form = {
  name: Name;
  hurigana: Name;
  sex: Sex;
  email: string;
  password: string;
  year: string;
  month: string;
};

export const initialForm: Form = {
  name: {
    first: "",
    last: "",
  },
  hurigana: {
    first: "",
    last: "",
  },
  email: "",
  password: "",
  sex: "male",
  year: "",
  month: "",
};
