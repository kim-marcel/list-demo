from google.appengine.ext import ndb
from google.oauth2 import id_token
from google.auth.transport import requests

from src.models import MyUser
from src.models import MyList

CLIENT_ID = 'INSERT_CLIENT_ID_HERE'


# Returns id_info if token can be successfully verified, else None
def verify_token(token):
    # verify integrity of the id-token (see: https://developers.google.com/identity/sign-in/web/backend-auth)
    try:
        id_info = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

        if id_info:
            if id_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')
        else:
            raise ValueError('Value is None.')

    except ValueError:
        # Invalid token
        return None

    return id_info


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
