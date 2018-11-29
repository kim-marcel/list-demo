from google.appengine.ext import ndb

from listentry_model import ListEntry


class List(ndb.Model):
    list_elements = ndb.KeyProperty(ListEntry, repeated=True)
