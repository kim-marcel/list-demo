from flask import Blueprint, request, abort, jsonify

from src.utilities import auth

list_bp = Blueprint('list', __name__)


@list_bp.route('/list', methods=['GET'])
def get_list():
    id_token = request.headers['Authorization'].split(' ').pop()
    user_info = auth.verify_token(id_token)
    user_id = auth.get_user_id(user_info)

    # check whether user is logged in and in datastore
    if auth.is_user_authorized(user_id):
        if not auth.is_user_in_datastore(user_id):
            auth.add_user_to_datastore(user_id)

        # Get content and add to response
        return jsonify(list=auth.get_list_of_user(user_id))

    # if no user is logged in return error
    else:
        abort(401)


@list_bp.route('/list', methods=['POST'])
def add_element_to_list():
    new_list_element = request.get_json()['input']
    id_token = request.headers['Authorization'].split(' ').pop()
    user_info = auth.get_id_info(id_token)
    user_id = auth.get_user_id(user_info)

    # check whether user is logged in and in datastore
    if auth.is_user_authorized(user_id):

        if new_list_element:
            auth.add_element_to_user_list(user_id, new_list_element)
            return jsonify(responseCode=200, responseMessage="Successfully added to list")
        else:
            return jsonify(responseCode=200, responseMessage="Nothing was added to list")

    # if no user is logged return error
    else:
        abort(401)
