# List Demo App

This is a demo "shopping-list"-App using a python Google App Engine Backend-API and an Angular 6 Frontend-App.

## Getting started

### Prerequisites

 - [Python 2.7](https://docs.python.org/2.7/) 
 - [Google Cloud SDK for Python](https://cloud.google.com/appengine/docs/standard/python/download)
 - [Angular CLI](https://cli.angular.io)
 - [pm2](https://pm2.io/doc/en/runtime/quick-start/)

### Run the application

#### Use devstart-script:
Start API and App with one command using the devstart-script and pm2.
```
./devstart
```
Use ```pm2 stop [id | all]```, ```pm2 status```, ```pm2 log [id]```, ```pm2 delete all``` to manage the processes. For more commands check out the [pm2-documentation](https://pm2.io/doc/en/runtime/quick-start/).

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