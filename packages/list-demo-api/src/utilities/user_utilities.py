from google.appengine.ext import ndb

from src.models import List
from src.models import User
from src.utilities import auth_utilities


def get_current_user(id_token):
    user_info = auth_utilities.verify_token(id_token)
    current_user_id = get_user_id(user_info)

    # check whether user is logged in and in datastore
    if current_user_id:
        return {
            'user': get_user_from_datastore(current_user_id),
            'user_id': current_user_id,
        }
    return None


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


def is_users_list(myuser, mylist_id):
    return myuser.list == ndb.Key(urlsafe=mylist_id)
