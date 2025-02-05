import "./LoginResetPassword.css";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import FormContainer from "./FormContainer";
import AppErrorText from "../components/AppErrorText";
import AppTextInput from "../components/AppTextInput";
import AppFormInputButton from "../components/AppFormInputButton";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;


    return (
        <FormContainer>
            <div className="forgot-password-page-header">
                <h1>{msg("emailForgotTitle")}</h1>
                <p>{realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}</p>
            </div>
            <form id="kc-reset-password-form" className="forgot-password-page-form" action={url.loginAction} method="post">
                <div className="forgot-password-page-form-group">
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <label htmlFor="username" className="forgot-password-page-label">
                            {!realm.loginWithEmailAllowed
                                ? msg("username")
                                : !realm.registrationEmailAsUsername
                                    ? msg("usernameOrEmail")
                                    : msg("email")}
                        </label>
                    </div>

                    <div>
                        <AppTextInput
                            id="username"
                            name="username"
                            defaultValue={auth.attemptedUsername ?? ""}
                        />
                        {messagesPerField.existsError("username") && (
                            <AppErrorText text={messagesPerField.getFirstError("username")} />
                        )}
                    </div>
                </div>

                <AppFormInputButton
                    text={msgStr("doSubmit")}
                />
            </form>

            <div className="forgot-password-page-footer">
                <a href={url.loginUrl}>{msg("backToLogin")}</a>
            </div>
        </FormContainer>
    );
}
