FROM bitnami/keycloak:26.1.0

COPY ./balhom-realm-config.json /opt/bitnami/keycloak/data/import/balhom-realm-config.json

COPY ./balhom-keycloak-theme/dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar /opt/bitnami/keycloak/providers/balhom-keycloak-theme.jar

COPY keycloak-init.sh /opt/bitnami/scripts/keycloak-init.sh

RUN chmod +x /opt/bitnami/scripts/keycloak-init.sh

CMD ["/opt/bitnami/scripts/keycloak-init.sh"]
