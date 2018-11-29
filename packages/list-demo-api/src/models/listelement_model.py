from google.appengine.ext import ndb


class ListElement(ndb.Model):
    # In the future more features can be added (e.g. favorite, tagged,...)
    value = ndb.StringProperty()

    def serialize(self):
        return {
            'listElementValue': self.value,
            'listElementId': self.key.id(),
        }
