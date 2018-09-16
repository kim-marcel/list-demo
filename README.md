# List Demo App

This is a demo "shopping-list"-App using a python Google App Engine Backend-API and an Angular 6 Frontend.

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
 - [yarn](https://yarnpkg.com/)
 
Authentication:
 - a Google account with a firebase project: [Documentation](https://firebase.google.com/docs/web/setup)
 - Make sure to insert your project-id and other credentials here:
    - /list-demo/packages/list-demo-api/src/app.yaml
    - /list-demo/packages/list-demo-app/src/environments/environment.ts
 
If you want to deploy this project you also need:
 - [firebase-tools](https://firebase.google.com/docs/cli/)
 - a Google account with a GAE and a firebase project set up: [Documentation](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
 - Make sure to insert your firebase project-id here...
    - /list-demo/packages/list-demo-app/.firebaserc
 - ... and your Google Cloud project-id here:
    - /list-demo/packages/deploy.sh
 - Don't forget to set the production api-URL in:
    - /list-demo/packages/list-demo-app/src/environment/environment.prod.ts
    
*** NOTE: Your project-id can be the same for Google Cloud, Firebase Hosting & Firebase Authentication ***
 
### Setup

#### Use yarn:
Install API and App dependencies.
```
yarn install
```

#### Alternative:
Install API and App dependencies individually.

###### In API-directory:

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

###### In App-directory:

Install dependencies using ```npm``` or ```yarn```:
```
npm install
```
or
```
yarn
```

### Run the application

#### Use yarn:
Start API and App with yarn using the devstart-script and pm2.
```
yarn start
```
Use ```pm2 stop [id | all]```, ```pm2 status```, ```pm2 log [id]``` to manage the processes. For more commands check out the [pm2-documentation](https://pm2.io/doc/en/runtime/quick-start/).

#### Alternative:
Start API and App individually.

###### In API-directory:

Start the API-server
```
dev_appserver.py app.yaml
```
The API will be served on [http://localhost:8080](http://localhost:8080).

###### In App-directory:

Start the Angular-App
```
ng serve
```
The App can be viewed on [http://localhost:4200](http://localhost:4200).

### Deploy the application

#### Use yarn:
Deploy API to Google Cloud and the App to Firebase Hosting.
```
yarn deploy
```
#### Alternative:
Deploy API and App individually.

###### In API-directory:

Deploy the API
```
gcloud app deploy app.yaml -q --project [PROJECT_ID]
```
For further help checkout the [Google Cloud Documentation](https://cloud.google.com/appengine/docs/flexible/python/testing-and-deploying-your-app).

###### In App-directory:

Deploy the Angular-App
```
firebase deploy
```
For further help checkout the [Firebase Documentation](https://firebase.google.com/docs/hosting/deploying).

## TODO
- ~~decide which css framework should be used (material, bootstrap, primeng,...)? + implementation~~
- ~~text-service: get texts (button, headlines,...) from json-file~~
- ~~add content page (homepage)~~
- ~~refactor list-service~~
- write tests + run them with yarn + test-coverage
- ~~refactor project structure (packages-folder)~~
- rename angular-app
- ~~use yarn instead of npm??~~
- ~~deploy + deploy-script~~
- ~~add central error-handling~~
- logging
- ~~which database should be used (google cloud datastore, firebase,...)?~~: Google Cloud Datastore for now!
- add ability to delete list-entries
- ~~show login/logout-button dynamically depending whether user is logged in or not~~
- add session expired error notification
- add email-login
- ~~add github-login~~
- ~~redesign of login page~~
- refactor auth service
- ~~auth-guard~~
- ~~bugfix: revert order of list in list-component~~
- ~~loading-indicator (spinner/ progress-bar) when navigating between routes~~
- ~~add alert, that says that this is just a demo and no sensitive/ important data should be stored there + no liability~~
