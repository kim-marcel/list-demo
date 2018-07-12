from google.appengine.api import users
import webapp2
import json


class Logout(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/json'
        self.response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200'

        response = json.dumps({"logoutUrl": users.create_logout_url(self.request.uri)})
        self.response.write(response)
