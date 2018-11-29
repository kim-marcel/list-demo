from google.appengine.ext import ndb

from list_model import List


class User(ndb.Model):
    # Reference the users list with the key of the list (key = user id + "/list")
    # use StructuredProperty??
    list = ndb.KeyProperty(List)
