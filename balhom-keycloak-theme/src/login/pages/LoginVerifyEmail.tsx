import "./LoginVerifyEmail.css";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import FormContainer from "./FormContainer";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const { msg } = i18n;

    const { url, user } = kcContext;

    return (
        <FormContainer>
            <div className="verify-email-page-header">
                <h1>{msg("emailVerifyTitle")}</h1>
            </div>
            <div className="verify-email-page-instructions">
                <p>{msg("emailVerifyInstruction1", user?.email ?? "")}</p>
            </div>
            <div className="verify-email-page-footer">
                <p>
                    {msg("emailVerifyInstruction2")}
                    <br />
                    <a href={url.loginAction}>{msg("doClickHere")}</a>
                    &nbsp;
                    {msg("emailVerifyInstruction3")}
                </p>
            </div>
        </FormContainer>
    );
}
