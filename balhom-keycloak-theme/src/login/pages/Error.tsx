import "./Error.css";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const { message, client, skipLink } = kcContext;

    const { msg } = i18n;

    return (
        <div className="app-error-page-container">
            <h2 className="app-error-page-title">{msg("errorTitle")}</h2>
            <p className="app-error-page-text" dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
            {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                <a href={client.baseUrl} className="app-error-page-home-link">
                    {msg("backToApplication")}
                </a>
            )}
        </div>
    );
}
