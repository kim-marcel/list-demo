from flask import jsonify
from src.utilities import user_utilities


def get_list_of_user(myuser):
    if myuser:
        list_of_keys = myuser.list.get().list_elements
        element_list = [key.get().serialize() for key in list_of_keys]
        return element_list


def add_to_list(new_list_element, user):
    if new_list_element:
        user_utilities.add_element_to_user_list(user, new_list_element)
        return jsonify(responseCode=200, responseMessage="Successfully added to list")
    else:
        return jsonify(responseCode=200, responseMessage="Empty String: Nothing was added to list")


def delete_from_list(list_element_id, user):
    if list_element_id:
        user_utilities.delete_element_from_user_list(user, list_element_id)
        return jsonify(responseCode=200, responseMessage="Successfully deleted from list")
    else:
        return jsonify(responseCode=200, responseMessage="Empty String: Nothing was deleted from list")