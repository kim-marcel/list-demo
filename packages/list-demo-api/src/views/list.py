from flask import Blueprint, request, abort, jsonify

from src.utilities import auth
from src.utilities import user

list_bp = Blueprint('list', __name__)


@list_bp.route('/list', methods=['GET'])
def get_list():
    id_token = request.headers['Authorization'].split(' ').pop()
    user_info = auth.verify_token(id_token)
    user_id = user.get_user_id(user_info)

    # check whether user is logged in and in datastore
    if user.is_user_authorized(user_id):
        if not user.is_user_in_datastore(user_id):
            user.add_user_to_datastore(user_id)

        # Get content and add to response
        return jsonify(user.get_list_of_user(user_id))

    # if no user is logged in return error
    else:
        abort(401)


@list_bp.route('/list', methods=['POST'])
def post_to_list():
    id_token = request.headers['Authorization'].split(' ').pop()
    user_info = auth.get_id_info(id_token)
    user_id = user.get_user_id(user_info)

    # check whether user is logged in and in datastore
    if user.is_user_authorized(user_id):
        list_element_action = request.get_json()['action']

        if list_element_action == 'add':
            list_element = request.get_json()['input']
            return add_to_list(list_element, user_id)
        elif list_element_action == 'delete':
            list_element_id = request.get_json()['id']
            return delete_from_list(list_element_id, user_id)
        else:
            abort(500, "No valid action was provided.")

    # if no user is logged return error
    else:
        abort(401)


def add_to_list(new_list_element, user_id):
    if new_list_element:
        user.add_element_to_user_list(user_id, new_list_element)
        return jsonify(responseCode=200, responseMessage="Successfully added to list")
    else:
        return jsonify(responseCode=200, responseMessage="Empty String: Nothing was added to list")


def delete_from_list(list_element_id, user_id):
    if list_element_id:
        user.delete_element_from_user_list(user_id, list_element_id)
        return jsonify(responseCode=200, responseMessage="Successfully deleted from list")
    else:
        return jsonify(responseCode=200, responseMessage="Empty String: Nothing was deleted from list")
