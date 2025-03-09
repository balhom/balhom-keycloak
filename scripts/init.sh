#!/bin/bash

set -e

# Wait until Keycloak is initialized
until curl -s -o /dev/null http://localhost:8080; do
    echo "Waiting for Keycloak to be ready..."
    sleep 5
done

# Default values for Keycloak initialization
: "${KEYCLOAK_INIT_REALM:=balhom-realm}"
: "${KEYCLOAK_INIT_CLIENT:=balhom-client}"
: "${KEYCLOAK_INIT_API_CLIENT:=balhom-api-client}"

export PATH=$PATH:/opt/bitnami/keycloak/bin

echo "Starting initialization of Keycloak server"

## Log in as master realm admin
echo "Logging into Keycloak realm master as ${KC_BOOTSTRAP_ADMIN_USERNAME}"

kcadm.sh config credentials --server http://localhost:8080 \
  --realm master --user "${KC_BOOTSTRAP_ADMIN_USERNAME}" \
  --password "${KC_BOOTSTRAP_ADMIN_PASSWORD}"

## Realm creation step
if ! kcadm.sh get realms/${KEYCLOAK_INIT_REALM} &>/dev/null; then
  echo "Creating '${KEYCLOAK_INIT_REALM}' realm"

  kcadm.sh create realms -s realm="${KEYCLOAK_INIT_REALM}" \
    -s enabled=true -s registrationEmailAsUsername=true \
    -s loginTheme=balhom-keycloak-theme -s verifyEmail=true \
    -s registrationAllowed=true -s rememberMe=true \
    -s resetPasswordAllowed=true -s loginWithEmailAllowed=true

  kcadm.sh update realms/${KEYCLOAK_INIT_REALM} \
     -s 'userProfile={"attributes": {"firstName": {"enabled": false}, "lastName": {"enabled": false}}}'

  # Init realm user
  if [[ -n "${KEYCLOAK_INIT_USER}" && -n "${KEYCLOAK_INIT_USER_PASSWORD}" ]]; then
    echo "Creating '${KEYCLOAK_INIT_USER}' user in '${KEYCLOAK_INIT_REALM}' realm"
    
    kcadm.sh create users -r "${KEYCLOAK_INIT_REALM}" \
      -s username="${KEYCLOAK_INIT_USER}" -s enabled=true \
      -s email="${KEYCLOAK_INIT_USER}" -s emailVerified=true \
      -s firstName="Test" -s lastName="Test"
    
    kcadm.sh set-password -r "${KEYCLOAK_INIT_REALM}" \
      --username "${KEYCLOAK_INIT_USER}" \
      --new-password "${KEYCLOAK_INIT_USER_PASSWORD}"
    
    echo "Created '${KEYCLOAK_INIT_USER}' user in '${KEYCLOAK_INIT_REALM}' realm"

    # Create client for WEB
    echo "Creating '${KEYCLOAK_INIT_CLIENT}' client"

    kcadm.sh create clients -r "${KEYCLOAK_INIT_REALM}" \
      -s clientId="${KEYCLOAK_INIT_CLIENT}" -s enabled=true -s \
      publicClient=true -s redirectUris='["*"]' \
      -s webOrigins='["*"]' -s directAccessGrantsEnabled=true \
      -s standardFlowEnabled=true
    
    echo "Created new client '${KEYCLOAK_INIT_CLIENT}'"
  else
    echo "Skipping user creation as KEYCLOAK_INIT_USER or KEYCLOAK_INIT_USER_PASSWORD is not set"
  fi
  
  # Create client for API
  echo "Creating '${KEYCLOAK_INIT_API_CLIENT}' client"

  kcadm.sh create clients -r "${KEYCLOAK_INIT_REALM}" \
    -s clientId="${KEYCLOAK_INIT_API_CLIENT}" \
    -s secret="${KEYCLOAK_INIT_API_CLIENT_SECRET}" \
    -s enabled=true -s publicClient=false -s redirectUris='["*"]' \
    -s serviceAccountsEnabled=true -s directAccessGrantsEnabled=true

  kcadm.sh add-roles --cclientid "realm-management" \
    -r "${KEYCLOAK_INIT_REALM}" \
    --uusername "service-account-${KEYCLOAK_INIT_API_CLIENT}" \
    --rolename manage-users
  
  echo "Created new client '${KEYCLOAK_INIT_API_CLIENT}'"

else
  >&2 echo "Realm already exists, skipping keycloak init"
fi

echo "Keycloak Server initialization completed!"
