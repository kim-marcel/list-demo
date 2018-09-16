from google.appengine.ext import ndb

from src.models import MyList
from src.models import MyListEntry
from src.models import MyUser


def get_user_id(id_info):
    return id_info['sub'] if id_info else None


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
        list_of_keys = myuser.list.get().list_elements
        element_list = [key.get().serialize() for key in list_of_keys]
        return element_list


def add_element_to_user_list(user_id, element):
    myuser = get_user_from_datastore(user_id)
    if myuser:
        mylistentry = MyListEntry(list_element=element)
        mylistentry.put()
        mylist = myuser.list.get()
        mylist.list_elements.append(mylistentry.key)
        mylist.put()


def delete_element_from_user_list(user_id, element_id):
    myuser = get_user_from_datastore(user_id)
    if myuser:
        mylistelement_key = ndb.Key(MyListEntry, element_id)
        mylist = myuser.list.get()
        if mylistelement_key.get():
            mylist.list_elements.remove(mylistelement_key)
            mylist.put()
            mylistelement_key.delete()


def is_user_authorized(user_id):
    return True if user_id else False
