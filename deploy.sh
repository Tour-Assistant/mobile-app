#!/bin/bash
# file: deploy.sh
# Resolve permission issue by "chmod +x deploy.sh"
yarn build
aws s3 cp build s3://my-tour-assistant.com/ --recursive
aws cloudfront create-invalidation --distribution-id E3GNM63DN8MKJ1 --paths "/*"