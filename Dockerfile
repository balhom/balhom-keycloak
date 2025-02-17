FROM bitnami/keycloak:26.1.0

COPY ./realm-config.json /opt/bitnami/keycloak/data/import/realm-config.json

COPY ./balhom-keycloak-theme/dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar /opt/bitnami/keycloak/providers/balhom-keycloak-theme.jar

EXPOSE 8080

ENTRYPOINT [ "/opt/bitnami/scripts/keycloak/run.sh" ]
