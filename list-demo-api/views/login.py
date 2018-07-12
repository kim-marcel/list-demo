from google.appengine.api import users
import webapp2
import json

from utilities import user_utilities as uu


class Login(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/json'
        self.response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200'

        if uu.is_user_logged_in():

            if not uu.is_user_in_datastore():
                uu.add_user_to_datastore()

        response = json.dumps({"loginUrl": users.create_login_url(self.request.uri)})
        self.response.write(response)
