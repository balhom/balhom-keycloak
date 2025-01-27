FROM bitnami/keycloak:26.1.0

COPY ./balhom-keycloak-theme/dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar /opt/bitnami/keycloak/providers/balhom-keycloak-theme.jar

ENTRYPOINT [ "/opt/bitnami/scripts/keycloak/run.sh" ]
