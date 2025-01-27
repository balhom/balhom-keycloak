import { useState } from "react";
import { useTranslation } from "../../../node_modules/react-i18next";
import { isEmail } from "../utils";

export const useEmailForm = (): [
  string,
  string,
  (newEmail: string) => void,
  () => boolean
] => {
  const { t } = useTranslation();

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const handleEmailChange: (newEmail: string) => void = (newEmail) => {
    setEmail(newEmail);

    if (!newEmail.trim()) {
      setEmailError(t("emailRequiredError"));
      return;
    } else if (!isEmail(newEmail)) {
      setEmailError(t("emailInvalidError"));
      return;
    }
    setEmailError("");
  };

  const isEmailValid: () => boolean = () => {
    if (!email.trim()) {
      return false;
    } else if (!isEmail(email)) {
      return false;
    }
    return true;
  };

  return [email, emailError, handleEmailChange, isEmailValid];
};
