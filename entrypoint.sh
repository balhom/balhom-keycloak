#!/bin/bash

# Start Keycloak in the background
/opt/bitnami/scripts/keycloak/run.sh &

# Wait for Keycloak to be ready
until curl -s http://localhost:8080/realms/master; do
  echo "Wait for Keycloak to be ready..."
  sleep 5
done

# Import the realm from the JSON file
echo "Importing realm..."
/opt/bitnami/keycloak/bin/kc.sh import --file /opt/bitnami/keycloak/data/import/balhom-realm-config.json

# Keeping the container active
wait
