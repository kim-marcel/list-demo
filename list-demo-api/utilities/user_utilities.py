from google.appengine.api import users
from google.appengine.ext import ndb

from models.myuser import MyUser
from models.mylist import MyList


# Get user from this page
def get_current_user():
    return users.get_current_user()


# get user from data
def get_user_from_datastore():
    user = get_current_user()
    if user:
        myuser_key = ndb.Key(MyUser, user.user_id())
        return myuser_key.get()


def is_user_logged_in():
    # get current user (returns none if no user is logged in)
    if get_current_user():
        return True
    else:
        return False


def is_user_in_datastore():
    return True if get_user_from_datastore() else False


def is_user_authorized():
    return is_user_logged_in() and is_user_in_datastore()


def add_user_to_datastore():
    myuser = MyUser(id=get_current_user().user_id())
    myuser.list = ndb.Key(MyList, get_current_user().user_id() + "/list")
    # commit to datastore
    myuser.put()
    mylist = MyList(id=get_current_user().user_id() + "/list")
    mylist.put()


def get_list_of_user():
    myuser = get_user_from_datastore()
    if myuser:
        return myuser.list.get().list_elements


def add_element_to_user_list(input):
    myuser = get_user_from_datastore()
    if myuser:
        mylist = myuser.list.get()
        mylist.list_elements.append(input)
        mylist.put()
