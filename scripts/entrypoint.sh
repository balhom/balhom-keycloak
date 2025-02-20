#!/bin/bash

set -e

# Data seed init script
/opt/bitnami/scripts/init.sh &

# Execute original entrypoint
exec /bin/bash /opt/bitnami/keycloak/bin/kc.sh start \
   --http-enabled=true \
   --db postgres \
   --db-password ${KEYCLOAK_DATABASE_PASSWORD} \
   --db-url-host ${KEYCLOAK_DATABASE_HOST} \
   --db-url-database ${KEYCLOAK_DATABASE_NAME} \
   --db-url-port ${KEYCLOAK_DATABASE_PORT} \
   --db-username ${KEYCLOAK_DATABASE_USER} "$@"
