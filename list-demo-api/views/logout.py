import webapp2
import json
from google.appengine.api import users


class Logout(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/json'
        response = json.dumps({"logoutUrl": users.create_logout_url(self.request.uri)})
        self.response.write(response)
