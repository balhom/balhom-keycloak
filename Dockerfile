FROM bitnami/keycloak:26.1.0

COPY ./balhom-realm-config.json /opt/bitnami/keycloak/data/import/balhom-realm-config.json

COPY ./balhom-keycloak-theme/dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar /opt/bitnami/keycloak/providers/balhom-keycloak-theme.jar

COPY ./entrypoint.sh /opt/bitnami/scripts/keycloak-init.sh

USER root

RUN chmod +x /opt/bitnami/scripts/keycloak-init.sh

USER 1001

CMD ["/opt/bitnami/scripts/keycloak-init.sh"]
