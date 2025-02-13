import "./LoginUpdatePassword.css";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import FormContainer from "./FormContainer";
import AppCheckboxInput from "../components/AppCheckboxInput";
import AppErrorText from "../components/AppErrorText";
import AuthPasswordInput from "../components/AuthPasswordInput";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    return (
        <FormContainer>
            <div className="login-update-password-page-header">
                <h1>{msg("updatePasswordTitle")}</h1>
            </div>

            <form id="kc-passwd-update-form" className="login-update-password-page-form" action={url.loginAction} method="post">
                <div className="login-update-password-page-form-group">
                    <label htmlFor="password-new" className="login-update-password-page-label">
                        {msg("passwordNew")}
                    </label>

                    <AuthPasswordInput id="password-new" name="password-new" passwordInputId="password-new" i18n={i18n} autoComplete="new-password" />

                    {messagesPerField.existsError("password") && (
                        <AppErrorText text={kcSanitize(messagesPerField.get("password")) as unknown as string} />
                    )}
                </div>

                <div className="login-update-password-page-form-group">
                    <label htmlFor="password-confirm" className="login-update-password-page-label">
                        {msg("passwordConfirm")}
                    </label>

                    <AuthPasswordInput
                        id="password-confirm"
                        name="password-confirm"
                        passwordInputId="password-confirm"
                        i18n={i18n}
                        autoComplete="new-password"
                    />

                    {messagesPerField.existsError("password-confirm") && (
                        <AppErrorText text={kcSanitize(messagesPerField.get("password-confirm")) as unknown as string} />
                    )}
                </div>

                <div className="login-update-password-page-form-group">
                    <LogoutOtherSessions i18n={i18n} />

                    <div id="kc-form-buttons" className="login-update-password-page-actions">
                        <input className="login-update-password-page-button confirm" type="submit" value={msgStr("doSubmit")} />
                        {isAppInitiatedAction && (
                            <button className="login-update-password-page-button cancel" type="submit" name="cancel-aia" value="true">
                                {msg("doCancel")}
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </FormContainer>
    );
}

function LogoutOtherSessions(props: { i18n: I18n }) {
    const { i18n } = props;

    const { msgStr } = i18n;

    return (
        <div id="kc-form-options">
            <AppCheckboxInput
                id="logout-sessions"
                name="logout-sessions"
                tabIndex={5}
                text={msgStr("logoutOtherSessions")}
                value="on"
                defaultChecked={true}
            />
        </div>
    );
}
