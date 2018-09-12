#!/usr/bin/env bash

# deploy api to google cloud
cd list-demo-api
gcloud app deploy app.yaml -q --project [PROJECT_ID]
cd ..

# deploy app to firebase hosting
cd list-demo-app
rm -rf dist
ng build --prod
firebase deploy