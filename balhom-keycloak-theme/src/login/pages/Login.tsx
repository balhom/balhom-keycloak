import "./Login.css";
import { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import FormContainer from "./FormContainer";
import AppTextInput from "../components/AppTextInput";
import AuthPasswordInput from "../components/AuthPasswordInput";
import AppCheckboxInput from "../components/AppCheckboxInput";
import AppFormButton from "../components/AppFormButton";
import AppErrorText from "../components/AppErrorText";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const { realm, url, usernameHidden, login, auth, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <FormContainer>
            {/* Header Part */}
            <div className="login-page-header">
                <h1>{msg("loginAccountTitle")}</h1>
            </div>

            {/* Form Part */}
            {realm.password && (
                <form
                    id="kc-form-login"
                    className="login-page-form"
                    onSubmit={() => {
                        setIsLoginButtonDisabled(true);
                        return true;
                    }}
                    action={url.loginAction}
                    method="post"
                >

                    {/* Email Part */}
                    {!usernameHidden && (
                        <div className="login-page-form-group">
                            <label htmlFor="username" className="login-page-label">
                                {!realm.loginWithEmailAllowed
                                    ? msg("username")
                                    : !realm.registrationEmailAsUsername
                                        ? msg("usernameOrEmail")
                                        : msg("email")}
                            </label>
                            <AppTextInput
                                tabIndex={2}
                                id="username"
                                name="username"
                                defaultValue={login.username ?? ""}
                                autoComplete="username"
                                aria-invalid={messagesPerField.existsError("username", "password")}
                            />
                            {messagesPerField.existsError("username", "password") && (
                                <AppErrorText text={messagesPerField.getFirstError("username", "password")} />
                            )}
                        </div>
                    )}

                    {/* Password Part */}
                    <div className="login-page-form-group">
                        <label htmlFor="password" className="login-page-label">
                            {msg("password")}
                        </label>
                        <AuthPasswordInput
                            tabIndex={3}
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            i18n={i18n}
                            passwordInputId="password"
                        />
                        {usernameHidden && messagesPerField.existsError("username", "password") && (
                            <AppErrorText text={messagesPerField.getFirstError("username", "password")} />
                        )}
                    </div>

                    <div>
                        {/* Remember me Part */}
                        {realm.rememberMe && !usernameHidden && (
                            <div className="checkbox">
                                <AppCheckboxInput
                                    id="rememberMe"
                                    name="rememberMe"
                                    tabIndex={5}
                                    text={msgStr("rememberMe")}
                                    defaultChecked={!!login.rememberMe} />
                            </div>
                        )}

                        {realm.resetPasswordAllowed && (
                            <a tabIndex={6} href={url.loginResetCredentialsUrl} className="login-page-forgot-password-link">
                                {msg("doForgotPassword")}
                            </a>
                        )}
                    </div>

                    <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                    <AppFormButton
                        tabIndex={7}
                        isDisabled={isLoginButtonDisabled}
                        name="login"
                        id="kc-login"
                        text={msgStr("doLogIn")}
                    />
                </form>
            )}
            <div className="login-page-footer">
                {msg("noAccount")}{" "}
                <a tabIndex={8} href={url.registrationUrl}>
                    {msg("doRegister")}
                </a>
            </div>
        </FormContainer>
    );
}
