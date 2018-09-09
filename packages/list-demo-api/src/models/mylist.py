from google.appengine.ext import ndb


class MyList(ndb.Model):
    list_elements = ndb.StringProperty(repeated=True)
