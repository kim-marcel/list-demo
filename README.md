# List Demo App

This is a demo "shopping-list"-App using a python Google App Engine Backend-API and an Angular 6 Frontend-App.

## Getting started

### Prerequisites

 - [Python 2.7](https://docs.python.org/2.7/) 
 - [Google Cloud SDK for Python](https://cloud.google.com/appengine/docs/standard/python/download)
 - Angular 6 CLI

### Run the application

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