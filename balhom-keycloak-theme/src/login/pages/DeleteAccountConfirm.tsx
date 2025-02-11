import "./DeleteAccountConfirm.css";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import FormContainer from "./FormContainer";

export default function DeleteAccountConfirm(props: PageProps<Extract<KcContext, { pageId: "delete-account-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const { url, triggered_from_aia } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <FormContainer>
            <form action={url.loginAction} method="post">
                <div className="delete-account-confirm-header">
                    <h2 className="delete-account-confirm-title">{msg("deleteAccountConfirm")}</h2>
                </div>

                <div className="delete-account-confirm-box-message">
                    <p>{msg("deletingImplies")}</p>

                    <ul>
                        <li>{msg("loggingOutImmediately")}</li>
                        <li>{msg("errasingData")}</li>
                    </ul>
                </div>

                <p className="delete-account-confirm-message">{msg("finalDeletionConfirmation")}</p>

                <div id="kc-form-buttons" className="delete-account-confirm-actions">
                    <input className="delete-account-confirm-button confirm" type="submit" value={msgStr("doConfirmDelete")} />
                    {triggered_from_aia && (
                        <button className="delete-account-confirm-button cancel" type="submit" name="cancel-aia" value="true">
                            {msgStr("doCancel")}
                        </button>
                    )}
                </div>
            </form>
        </FormContainer>
    );
}
