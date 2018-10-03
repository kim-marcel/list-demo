from google.appengine.ext import ndb


class MyListEntry(ndb.Model):
    # In the future more features can be added (e.g. favorite, tagged,...)
    list_element = ndb.StringProperty()

    def serialize(self):
        return {
            'listElementValue': self.list_element,
            'listElementId': self.key.id(),
        }
