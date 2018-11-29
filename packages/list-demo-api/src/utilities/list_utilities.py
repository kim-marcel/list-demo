from flask import jsonify
from src.utilities import user_utilities


def add_to_list(new_list_element, user_id):
    if new_list_element:
        user_utilities.add_element_to_user_list(user_id, new_list_element)
        return jsonify(responseCode=200, responseMessage="Successfully added to list")
    else:
        return jsonify(responseCode=200, responseMessage="Empty String: Nothing was added to list")


def delete_from_list(list_element_id, user_id):
    if list_element_id:
        user_utilities.delete_element_from_user_list(user_id, list_element_id)
        return jsonify(responseCode=200, responseMessage="Successfully deleted from list")
    else:
        return jsonify(responseCode=200, responseMessage="Empty String: Nothing was deleted from list")