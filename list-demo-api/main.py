import webapp2

from views.login import Login
from views.logout import Logout
from views.list import List

# starts the web application we specify the full routing table here as well
app = webapp2.WSGIApplication([
    ('/list', List),
    ('/login', Login),
    ('/logout', Logout)
], debug=True)
