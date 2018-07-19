import webapp2

from views.login import Login
from views.logout import Logout
from views.list import List

# starts the web application we specify the full routing table here as well
app = webapp2.WSGIApplication([
    ('/api/list', List),
    ('/api/login', Login),
    ('/api/logout', Logout)
], debug=True)
