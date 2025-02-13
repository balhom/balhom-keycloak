import "./UpdateEmail.css";
import type { JSX } from "keycloakify/tools/JSX";
import { useState } from "react";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import FormContainer from "./FormContainer";
import AppCheckboxInput from "../components/AppCheckboxInput";

type UpdateEmailProps = PageProps<Extract<KcContext, { pageId: "update-email.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function UpdateEmail(props: UpdateEmailProps) {
    const { kcContext, i18n, doUseDefaultCss, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);

    const { url, isAppInitiatedAction } = kcContext;

    return (
        <FormContainer>
            {/* Header Part */}
            <div className="update-email-page-header">
                <h1>{msg("updateEmailTitle")}</h1>
            </div>

            {/* Form Part */}
            <form id="kc-update-email-form" className="update-email-page-form" action={url.loginAction} method="post">
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />

                <div className="update-email-page-form-group">
                    <LogoutOtherSessions i18n={i18n} />

                    <div id="kc-form-buttons" className="update-email-actions">
                        <input disabled={!isFormSubmittable} className="update-email-button confirm" type="submit" value={msgStr("doSubmit")} />
                        {isAppInitiatedAction && (
                            <button className="update-email-button cancel" type="submit" name="cancel-aia" value="true">
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
