import "./LoginResetPassword.css";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { useTranslation } from "../../../node_modules/react-i18next";
import FormContainer from "./FormContainer";
import { useState } from "react";
import { useEmailForm } from "../hooks/useEmailForm";
import AppTextInput from "../components/AppTextInput";
import AppFormButton from "../components/AppFormButton";
import axios from "axios";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext } = props;

    const { t } = useTranslation();

    const { url } = kcContext;

    const [email, emailError, handleEmailChange, isEmailValid] = useEmailForm();

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        handleEmailChange(email);

        if (!isEmailValid()) {
            return;
        }

        const bodyFormData = new FormData();
        bodyFormData.append("username", email)
        axios.post(url.loginAction, bodyFormData)

        setSubmitted(true);
    };

    if (submitted) {
        return (
            <FormContainer>
                {/* Header Part */}
                <div className="forgot-password-page-header">
                    <h1>{t("checkEmail")}</h1>
                    <p>{t("resetInstructions")}</p>
                </div>
                <div className="forgot-password-page-footer">
                    <a href={url.loginUrl}>{t("backToSignInRedirect")}</a>
                </div>
            </FormContainer>
        );
    }

    return (
        <FormContainer>
            <div className="forgot-password-page-header">
                <h1>{t("forgotPassword")}</h1>
                <p>{t("enterEmail")}</p>
            </div>
            <form id="kc-reset-password-form" className="forgot-password-page-form" onSubmit={handleSubmit}>
                <div className="forgot-password-page-form-group">
                    <label
                        className="forgot-password-page-label"
                        htmlFor="username"
                    >
                        {t("email")}
                    </label>

                    <AppTextInput
                        id="username"
                        text={email}
                        onTextChange={handleEmailChange}
                        errorText={emailError}
                        placeholder={t("emailPlaceholder")}
                    />
                </div>

                <AppFormButton text={t("resetPassword")} />
            </form>
            <div className="forgot-password-page-footer">
                <a href={url.loginUrl}>{t("backToSignInRedirect")}</a>
            </div>
        </FormContainer>
    );
}
