#!/bin/bash
# file: deploy.sh
# Resolve permission issue by "chmod +x deploy.sh"
yarn build
# aws s3 cp build s3://admin.my-tour-assistant.com/ --recursive