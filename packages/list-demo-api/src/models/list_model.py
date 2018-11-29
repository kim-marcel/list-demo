from google.appengine.ext import ndb

from listelement_model import ListElement


class List(ndb.Model):
    list_elements = ndb.KeyProperty(ListElement, repeated=True)
