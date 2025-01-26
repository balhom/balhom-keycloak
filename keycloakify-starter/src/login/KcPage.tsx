import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
import Login from "./pages/Login";
import LoginVerifyEmail from "./pages/LoginVerifyEmail";
import LoginResetPassword from "./pages/LoginResetPassword";
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    switch (kcContext.pageId) {
        case "login.ftl":
            return (<Login {...{ kcContext, i18n, classes }}
                Template={Template}
                doUseDefaultCss={false}
            />
            )
        case "login-verify-email.ftl":
            return (<LoginVerifyEmail {...{ kcContext, i18n, classes }}
                Template={Template}
                doUseDefaultCss={false}
            />
            )
        case "login-reset-password.ftl":
            return (<LoginResetPassword {...{ kcContext, i18n, classes }}
                Template={Template}
                doUseDefaultCss={false}
            />
            )
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
                                        doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                    />
                                );
                        }
                    })()}
                </Suspense>
            );
    }
}

const classes = {} satisfies { [key in ClassKey]?: string };
