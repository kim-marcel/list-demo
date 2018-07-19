import webapp2
import json

from utilities import user_utilities as uu


class List(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Content-Type'] = 'text/json'
        self.response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200'
        self.response.headers['Access-Control-Allow-Credentials'] = 'true'

        # check whether user is logged in and in datastore
        if uu.is_user_authorized():
            # Get content and add to response
            response = json.dumps({"list": uu.get_list_of_user()})

        # if no user is logged return error
        else:
            response = json.dumps({"errorCode": "401", "errorMessage": "Unauthorized"})
            self.response.set_status(401)

        self.response.write(response)

    def post(self):
        self.response.headers['Content-Type'] = 'text/json'
        self.response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200'
        self.response.headers['Access-Control-Allow-Credentials'] = 'true'

        request_body = json.loads(self.request.body)
        new_list_element = request_body.get('input')

        # check whether user is logged in and in datastore
        if uu.is_user_authorized():
            if new_list_element:
                uu.add_element_to_user_list(new_list_element)
                response = json.dumps(
                    {"responseCode": "200", "responseMessage": "Successfully added to list"})
            else:
                response = json.dumps(
                    {"responseCode": "200", "responseMessage": "Nothing was added to list"})

        # if no user is logged return error
        else:
            response = json.dumps({"responseCode": "401", "responseMessage": "Unauthorized"})
            self.response.set_status(401)

        self.response.write(response)

    def options(self):
        self.response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        self.response.headers['Access-Control-Allow-Methods'] = 'POST'
        self.response.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200'
        self.response.headers['Access-Control-Allow-Credentials'] = 'true'
