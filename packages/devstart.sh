#!/bin/bash

# start api
cd list-demo-api
pm2 start dev_appserver.py --name "list-demo-api" -- --clear_datastore=yes --dev_appserver_log_level=debug app.yaml
cd ..

# start app
cd list-demo-app
pm2 start ng --name "list-demo-app" -- serve