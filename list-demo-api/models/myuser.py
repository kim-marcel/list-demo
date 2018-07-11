from google.appengine.ext import ndb
from mylist import MyList


class MyUser(ndb.Model):
    # Reference the users list with the key of the list (key = user id + "/list")
    list = ndb.KeyProperty(MyList)
