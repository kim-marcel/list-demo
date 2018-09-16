from google.appengine.ext import ndb

from mylistentry import MyListEntry


class MyList(ndb.Model):
    list_elements = ndb.KeyProperty(MyListEntry, repeated=True)
