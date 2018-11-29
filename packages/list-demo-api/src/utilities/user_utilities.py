from google.appengine.ext import ndb

from src.models import List
from src.models import User


def get_user_id(id_info):
    return id_info['sub'] if id_info else None


def is_user_in_datastore(user_id):
    return True if get_user_from_datastore(user_id) else False


def get_user_from_datastore(user_id):
    if user_id:
        myuser_key = ndb.Key(User, user_id)
        return myuser_key.get()


def add_user_to_datastore(user_id):
    myuser = User(id=user_id)
    myuser.list = List().put()
    myuser.put()


def delete_user(myuser):
    if myuser:
        myuser.key.delete()


def is_user_authorized(user_id):
    return True if user_id else False


def is_users_list(myuser, mylist_id):
    return myuser.list == ndb.Key(urlsafe=mylist_id)
