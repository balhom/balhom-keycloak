import { EyeIcon, EyeOffIcon } from "lucide-react";
import "./AuthPasswordInput.css";
import { I18n } from "../i18n";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";

interface Props {
    id: string;
    name: string;
    tabIndex?: number;
    value?: string;
    autoComplete?: string;
    i18n: I18n;
    passwordInputId: string;
    disabled?: boolean;
    pattern?: string;
    size?: number;
    maxLength?: number;
    minLength?: number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const AuthPasswordInput: React.FC<Props> = ({
    id,
    name,
    tabIndex,
    value,
    autoComplete,
    i18n,
    passwordInputId,
    disabled,
    pattern,
    size,
    maxLength,
    minLength,
    onChange,
    onBlur
}: Props) => {
    const { msgStr } = i18n;

    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
        passwordInputId
    });

    return (
        <>
            <div className="auth-password-input-wrapper">
                <input
                    id={id}
                    name={name}
                    tabIndex={tabIndex}
                    className="auth-password-input"
                    type="password"
                    value={value}
                    placeholder="••••••••"
                    autoComplete={autoComplete}
                    disabled={disabled}
                    pattern={pattern}
                    size={size}
                    maxLength={maxLength}
                    minLength={minLength}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                <button
                    type="button"
                    className="auth-password-button"
                    onClick={toggleIsPasswordRevealed}
                    aria-label={msgStr(
                        isPasswordRevealed ? "hidePassword" : "showPassword"
                    )}
                >
                    {isPasswordRevealed ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            </div>
        </>
    );
};

export default AuthPasswordInput;
