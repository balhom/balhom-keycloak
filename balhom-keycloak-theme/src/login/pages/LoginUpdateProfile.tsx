import "./LoginUpdateProfile.css";
import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import FormContainer from "./FormContainer";

type LoginUpdateProfileProps = PageProps<Extract<KcContext, { pageId: "login-update-profile.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function LoginUpdateProfile(props: LoginUpdateProfileProps) {
    const { kcContext, i18n, doUseDefaultCss, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, isAppInitiatedAction } = kcContext;

    const { msg, msgStr } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);

    return (
        <FormContainer>
            {/* Header Part */}
            <div className="login-update-profile-page-header">
                <h1>{msg("loginProfileTitle")}</h1>
            </div>

            {/* Form Part */}
            <form id="kc-update-profile-form" className={"login-update-profile-page-form"} action={url.loginAction} method="post">
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />

                <div id="kc-form-buttons" className="login-update-profile-page-actions">
                    <input
                        disabled={!isFormSubmittable}
                        className="login-update-profile-page-button confirm"
                        type="submit"
                        value={msgStr("doSubmit")}
                    />
                    {isAppInitiatedAction && (
                        <button className="login-update-profile-page-button cancel" type="submit" name="cancel-aia" value="true" formNoValidate>
                            {msg("doCancel")}
                        </button>
                    )}
                </div>
            </form>
        </FormContainer>
    );
}
