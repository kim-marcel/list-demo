#!/usr/bin/env bash

# install api dependencies
cd list-demo-api
source venv/bin/activate
pip install -r requirements.txt
pip install -t lib -r requirements.txt
deactivate
cd ..

# install app dependencies
cd list-demo-app
yarngit