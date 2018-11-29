from google.appengine.ext import ndb

from src.models import ListElement, User


def get_list_by_user_id(myuser_id):
    myuser = ndb.Key(User, myuser_id).get()
    if myuser:
        list_of_keys = myuser.list.get().list_elements
        element_list = [key.get().serialize() for key in list_of_keys]
        return {
            'listId': myuser.list.get().key.urlsafe(),
            'listElements': element_list,
        }


def add_to_list(list_id, new_list_element):
    if new_list_element:
        return add_element_to_list(list_id, new_list_element)
    return False


def delete_from_list(list_id, list_element_id):
    if list_element_id:
        return delete_element_from_list(list_id, list_element_id)
    return False


def add_element_to_list(mylist_id, element):
    mylist = ndb.Key(urlsafe=mylist_id).get()
    if mylist:
        mylist.list_elements.append(ListElement(value=element).put())
        mylist.put()
        return True
    return False


def delete_element_from_list(mylist_id, element_id):
    mylistelement_key = ndb.Key(urlsafe=element_id)
    if mylistelement_key.get():
        mylist = ndb.Key(urlsafe=mylist_id).get()
        if mylist:
            mylist.list_elements.remove(mylistelement_key)
            mylist.put()
            mylistelement_key.delete()
            return True
    return False


# only deletes the list object and its elements but not the reference of the user
# list-key is returned
def delete_list(mylist):
    if mylist:
        mylist_key = mylist.key
        # important: copy by value!
        mylist_elements = mylist.list_elements[:]
        for mylist_element in mylist_elements:
            mylist_element.delete()
        mylist.key.delete()
        return mylist_key
