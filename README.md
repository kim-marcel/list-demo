# List Demo App

This is a demo "shopping-list"-App using a python Google App Engine Backend-API and an Angular 6 Frontend.
Check it out [here](https://listdemo-1533812564459.firebaseapp.com/home).

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
Done:
- ~~decide which css framework should be used (material, bootstrap, primeng,...)? + implementation~~
- ~~text-service: get texts (button, headlines,...) from json-file~~
- ~~add content page (homepage)~~
- ~~refactor list-service~~
- ~~refactor project structure (packages-folder)~~
- ~~use yarn instead of npm??~~
- ~~deploy + deploy-script~~
- ~~add central error-handling~~
- ~~which database should be used (google cloud datastore, firebase,...)?~~: Google Cloud Datastore for now!
- ~~add ability to delete list-entries~~
- ~~show login/logout-button dynamically depending whether user is logged in or not~~
- ~~add email-login and sign-up~~
- ~~add github-login~~
- ~~redesign of login page~~
- ~~refactor auth service~~
- ~~auth-guard~~
- ~~bugfix: revert order of list in list-component~~
- ~~loading-indicator (spinner/ progress-bar) when navigating between routes~~
- ~~add alert, that says that this is just a demo and no sensitive/ important data should be stored there + no liability~~
- ~~delete main.py in packages/list-demo-api --> not needed~~
- ~~add proper field + form validation (e.g. ValidationService)~~
- ~~error-messages for input-field-validation~~
- ~~add settings, where user can change name, password and email~~
- ~~when user-account gets deleted also delete his account + list + listentries in datastore (backend)~~
- ~~add settings for users that use social-sign-in~~
- ~~add error-handling (display errors in the ui like e.g. 'password wrong' probably by using toasts)~~
- ~~add session expired error notification~~
- ~~refactor api: use [Flask HTTPAuth](https://flask-httpauth.readthedocs.io/en/latest/)~~
- ~~use urlsafe() ids~~
- ~~add email-verification when new sign-up with email (front- and backend)~~
- ~~user should be able to delete account when e-mail is not verified yet~~

Not so important:
- expand user-object in api (add name, surname, ...)
- add ability to "star"/ pin a list entry
- footer
- make alert in list-view removeable
- navigation: back- and forward-navigation (partly already exists)
- 'greet' user with his name (Welcome back ..., here is your list:)
- use structured property in user for list (API)
- let session expire
- rename angular-app
- move errors-enum to enum-folder
- Firebase Cloud Functions
- set display name on email sign-in
- same email different accounts allowed?

Important:
- write tests + run them with yarn + test-coverage
- add possibility to reset password when forgotten
- change email
- refactor api
- refactor ui
- refactor ui notifications

Bugs:
- ~~Success-Message update profile is not shown (missing Text)~~
- ~~Error 'auth/account-exists-with-different-credential' is not caught~~
