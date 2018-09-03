from google.appengine.ext import ndb
from google.oauth2 import id_token
from google.auth.transport import requests
from requests_toolbelt.adapters import appengine

from src.models import MyUser
from src.models import MyList

# Patch to use requests module with GAE (see: https://stackoverflow.com/questions/9604799/can-python-requests-library
# -be-used-on-google-app-engine/37304524#37304524)
appengine.monkeypatch()

HTTP_REQUEST = requests.Request()


# Returns id_info if token can be successfully verified, else None
def verify_token(token):
    try:
        claims = id_token.verify_firebase_token(token, HTTP_REQUEST)

        if claims:
            return claims

    except ValueError:
        # invalid id_token
        return None


def get_id_info(token):
    return verify_token(token)


def get_user_id(id_info):
    return id_info['sub'] if id_info else None


def is_user_authorized(user_id):
    return True if user_id else False


def is_user_in_datastore(user_id):
    return True if get_user_from_datastore(user_id) else False


def get_user_from_datastore(user_id):
    if user_id:
        myuser_key = ndb.Key(MyUser, user_id)
        return myuser_key.get()


def add_user_to_datastore(user_id):
    myuser = MyUser(id=user_id)
    myuser.list = ndb.Key(MyList, user_id + "/list")
    # commit to datastore
    myuser.put()
    mylist = MyList(id=user_id + "/list")
    mylist.put()


def get_list_of_user(user_id):
    myuser = get_user_from_datastore(user_id)
    if myuser:
        return myuser.list.get().list_elements


def add_element_to_user_list(user_id, element):
    myuser = get_user_from_datastore(user_id)
    if myuser:
        mylist = myuser.list.get()
        mylist.list_elements.append(element)
        mylist.put()
