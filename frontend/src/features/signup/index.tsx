import "./style.css";
import { useState } from "react";
import { RegisterForm } from "./components/form";
import { ConfirmStep } from "./components/confirmStep";
import { Stepper } from "./components/stepper";
import { useForm } from "./hooks/form";

function SignupForm() {
  type Step = 1 | 2 | 3;
  const [step, setStep] = useState<Step>(1);

  return (
    <>
      <Stepper />
      {step === 1 && <RegisterForm />}
      {step === 2 && <ConfirmStep />}
      <button onClick={() => setStep((step + 1) as Step)}>
        Next
      </button>
    </>
  )
}

export default SignupForm;
