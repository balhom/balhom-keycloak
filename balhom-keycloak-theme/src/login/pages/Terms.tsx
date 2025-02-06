import "./Terms.css";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import FormContainer from "./FormContainer";

export default function Terms(props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const { msg, msgStr } = i18n;

    const { url } = kcContext;

    return (
        <FormContainer>
            {/* Header Part */}
            <div className="terms-header">
                <h2 className="terms-title">{msg("termsTitle")}</h2>
            </div>

            <p id="kc-terms-text" className="terms-message">
                {msg("termsText")}
            </p>

            <form action={url.loginAction} method="POST">
                <div className="terms-actions">
                    <input className="terms-button confirm" name="accept" id="kc-accept" type="submit" value={msgStr("doAccept")} />
                    <input className="terms-button cancel" name="cancel" id="kc-decline" type="submit" value={msgStr("doDecline")} />
                </div>
            </form>
        </FormContainer>
    );
}
