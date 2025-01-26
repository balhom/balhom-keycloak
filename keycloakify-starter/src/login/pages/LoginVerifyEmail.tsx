import "./main.css";
import "./LoginVerifyEmail.css";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import FormContainer from "./FormContainer";
import { useTranslation } from "react-i18next";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext } = props;

    const { t } = useTranslation();

    const { url } = kcContext;

    return (
        <FormContainer>
            <div className="verify-email-page-header">
                <h1>{t("verifyEmailTitle")}</h1>
                <p>{t("verificationSent")}</p>
            </div>
            <div className="verify-email-instructions">
                <p>{t("checkInbox")}</p>
                <p className="verify-email-spam-notice">{t("checkSpam")}</p>
            </div>
            <div className="verify-email-footer">
                <a href={url.loginAction}>{t("backToSignInRedirect")}</a>
            </div>
        </FormContainer>
    );
}
