import "./Info.css";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import FormContainer from "./FormContainer";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const { advancedMsgStr, msg } = i18n;

    const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;

    return (
        <FormContainer>
            <div className="info-header">
                <h1
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(messageHeader ?? message.summary)
                    }}
                ></h1>
            </div>
            <div id="kc-info-message" className="info-instructions">
                <p
                    dangerouslySetInnerHTML={{
                        __html: kcSanitize(
                            (() => {
                                let html = message.summary;

                                if (requiredActions) {
                                    html += "<b>";

                                    html += requiredActions.map(requiredAction => advancedMsgStr(`requiredAction.${requiredAction}`)).join(", ");

                                    html += "</b>";
                                }

                                return html;
                            })()
                        )
                    }}
                />
                {(() => {
                    if (skipLink) {
                        return null;
                    }

                    if (pageRedirectUri) {
                        return (
                            <div className="info-footer">
                                <a href={pageRedirectUri}>{msg("backToApplication")}</a>
                            </div>
                        );
                    }
                    if (actionUri) {
                        return (
                            <div className="info-footer">
                                <a href={actionUri}>{msg("proceedWithAction")}</a>
                            </div>
                        );
                    }

                    if (client.baseUrl) {
                        return (
                            <div className="info-footer">
                                <a href={client.baseUrl}>{msg("backToApplication")}</a>
                            </div>
                        );
                    }
                })()}
            </div>
        </FormContainer>
    );
}
