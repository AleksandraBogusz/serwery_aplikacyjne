#!/bin/bash

cd .. && \
mvn package && \
cd target && \
docker cp app.war wildfly:/opt/jboss/wildfly/standalone/deployments/
