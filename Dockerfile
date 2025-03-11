FROM bitnami/keycloak:26.1.0

COPY ./balhom-keycloak-theme/dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar /opt/bitnami/keycloak/providers/balhom-keycloak-theme.jar

COPY ./balhom-realm-kc-26.json /opt/bitnami/scripts/balhom-realm-kc-26.json

COPY ./scripts/entrypoint.sh /opt/bitnami/scripts/entrypoint.sh
COPY ./scripts/init.sh /opt/bitnami/scripts/init.sh

USER root

RUN chmod +x /opt/bitnami/scripts/entrypoint.sh
RUN chmod +x /opt/bitnami/scripts/init.sh

USER 1001

CMD ["/opt/bitnami/scripts/entrypoint.sh"]
