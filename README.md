# List Demo App

This is a demo "shopping-list"-App using a python Google App Engine Backend-API and an Angular 6 Frontend-App.

## Getting started

### Prerequisites

API:
 - [Python 2.7](https://docs.python.org/2.7/) 
 - [Google Cloud SDK for Python](https://cloud.google.com/appengine/docs/standard/python/download)
 
App:
 - [Node 10 and npm](https://nodejs.org/en/)
 - [Angular CLI 6](https://cli.angular.io)
 
Others:
 - [pm2](https://pm2.io/doc/en/runtime/quick-start/)
 
### Setup

In API-directory:

Create and enter a virtual Python environment using ```virtualenv```:
```
virtualenv venv
source venv/bin/activate
```

Install dependencies using ```pip```:
```
pip install -r requirements.txt
pip install -t lib -r requirements.txt
```

In App-directory:

Install dependencies using ```npm```:
```
npm install
```

### Run the application

#### Use devstart-script:
Start API and App with one command using the devstart-script and pm2.
```
./devstart.sh
```
Use ```pm2 stop [id | all]```, ```pm2 status```, ```pm2 log [id]``` to manage the processes. For more commands check out the [pm2-documentation](https://pm2.io/doc/en/runtime/quick-start/).

#### Alternative:
Start API and App individually.

Start the API-server:
```
cd list-demo-api
dev_appserver.py app.yaml
```
The API will be served on [http://localhost:8080](http://localhost:8080).

Start the Angular-App:
```
cd list-demo-app
ng serve
```
The App can be viewed on [http://localhost:4200](http://localhost:4200).

Make sure to insert your project credentials in
 - /list-demo/list-demo-api/src/app.yaml
 - /list-demo/list-demo-app/src/environments/environment.ts
 
 ## TODO
 - decide which css framework should be used (material, bootstrap, primeng,...)? + implementation
 - text-service: get texts (button, headlines,...) from json-file
 - add content page (homepage)
 - refactor list-service
 - write tests
 - refactor project structure (packages-folder, rename angular-app)
 - use yarn instead of npm??
 - deploy
