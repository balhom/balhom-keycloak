import "../main.css";
import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
import LoginVerifyEmail from "./pages/LoginVerifyEmail";
import Login from "./pages/Login";
import LoginResetPassword from "./pages/LoginResetPassword";
import Register from "./pages/Register";
import Error from "./pages/Error";
import Info from "./pages/Info";
import DeleteAccountConfirm from "./pages/DeleteAccountConfirm";
import Terms from "./pages/Terms";
import LoginUpdatePassword from "./pages/LoginUpdatePassword";
import UpdateEmail from "./pages/UpdateEmail";
import LoginUpdateProfile from "./pages/LoginUpdateProfile";

const UserProfileFormFields = lazy(() => import("./UserProfileFormFields"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    switch (kcContext.pageId) {
        case "info.ftl":
            return (
                <Info
                    {...{ kcContext, i18n, classes }}
                    Template={Template}
                    doUseDefaultCss={false}
                />
            );
        case "login.ftl":
            return (
                <Login
                    {...{ kcContext, i18n, classes }}
                    Template={Template}
                    doUseDefaultCss={false}
                />
            );
        case "login-verify-email.ftl":
            return (
                <LoginVerifyEmail
                    {...{ kcContext, i18n, classes }}
                    Template={Template}
                    doUseDefaultCss={false}
                />
            );
        case "login-reset-password.ftl":
            return (
                <LoginResetPassword
                    {...{ kcContext, i18n, classes }}
                    Template={Template}
                    doUseDefaultCss={false}
                />
            );
        case "login-update-password.ftl":
            return (
                <LoginUpdatePassword
                    {...{ kcContext, i18n, classes }}
                    Template={Template}
                    doUseDefaultCss={false}
                />
            );
        case "login-update-profile.ftl":
            return (
                <LoginUpdateProfile
                    {...{ kcContext, i18n, classes }}
                    Template={Template}
                    doUseDefaultCss={false}
                    UserProfileFormFields={UserProfileFormFields}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
            );
        case "update-email.ftl":
            return (
                <UpdateEmail
                    {...{ kcContext, i18n, classes }}
                    Template={Template}
                    doUseDefaultCss={false}
                    UserProfileFormFields={UserProfileFormFields}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
            );
        case "register.ftl":
            return (
                <Register
                    {...{ kcContext, i18n, classes }}
                    Template={Template}
                    doUseDefaultCss={false}
                    UserProfileFormFields={UserProfileFormFields}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
            );
        case "terms.ftl":
            return (
                <Terms
                    {...{ kcContext, i18n, classes }}
                    Template={Template}
                    doUseDefaultCss={false}
                />
            );
        case "delete-account-confirm.ftl":
            return (
                <DeleteAccountConfirm
                    {...{ kcContext, i18n, classes }}
                    Template={Template}
                    doUseDefaultCss={true}
                />
            );
        case "error.ftl":
            return (
                <Error
                    {...{ kcContext, i18n, classes }}
                    Template={Template}
                    doUseDefaultCss={false}
                />
            );
        default:
            return (
                <Suspense>
                    {(() => {
                        switch (kcContext.pageId) {
                            default:
                                return (
                                    <DefaultPage
                                        kcContext={kcContext}
                                        i18n={i18n}
                                        classes={classes}
                                        Template={Template}
                                        doUseDefaultCss={true}
                                        UserProfileFormFields={UserProfileFormFields}
                                        doMakeUserConfirmPassword={
                                            doMakeUserConfirmPassword
                                        }
                                    />
                                );
                        }
                    })()}
                </Suspense>
            );
    }
}

const classes = {} satisfies { [key in ClassKey]?: string };
