import { EyeIcon, EyeOffIcon } from "lucide-react";
import "./AuthPasswordInput.css";
import { I18n } from "../i18n";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";

interface Props {
  id: string;
  name: string;
  tabIndex: number;
  autoComplete: string;
  i18n: I18n;
  passwordInputId: string;
}

const AuthPasswordInput: React.FC<Props> = ({
  id,
  name,
  tabIndex,
  autoComplete,
  i18n,
  passwordInputId,
}: Props) => {
  const { msgStr } = i18n;

  const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({ passwordInputId });

  return (
    <>
      <div className="auth-password-input-wrapper">
        <input
          id={id}
          name={name}
          tabIndex={tabIndex}
          className="auth-password-input"
          type="password"
          placeholder="••••••••"
          autoComplete={autoComplete}
        />
        <button
          type="button"
          className="auth-password-button"
          onClick={toggleIsPasswordRevealed}
          aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
        >
          {isPasswordRevealed ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
    </>
  );
};

export default AuthPasswordInput;
