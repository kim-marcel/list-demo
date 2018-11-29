from flask import abort, Blueprint, g,  jsonify, request
from flask_httpauth import HTTPTokenAuth

from src.utilities import auth_utilities
from src.utilities import list_utilities
from src.utilities import user_utilities

auth = HTTPTokenAuth('Bearer')
lists_bp = Blueprint('lists', __name__)


@auth.verify_token
def verify_token(id_token):
    user_info = auth_utilities.verify_token(id_token)
    # save the id of the current user to the application context g
    g.current_user_id = user_utilities.get_user_id(user_info)

    # check whether user is logged in and in datastore
    if user_utilities.is_user_authorized(g.current_user_id):
        g.current_user = user_utilities.get_user_from_datastore(g.current_user_id)
        return True
    return False


@lists_bp.route('/lists', methods=['GET'])
@auth.login_required
def get():
    if not user_utilities.is_user_in_datastore(g.current_user_id):
        user_utilities.add_user_to_datastore(g.current_user_id)

    return jsonify(list_utilities.get_list_of_user(g.current_user))


@lists_bp.route('/lists', methods=['POST'])
@auth.login_required
def post():
    list_element_action = request.get_json()['action']

    if list_element_action == 'add':
        list_element = request.get_json()['input']
        return list_utilities.add_to_list(list_element, g.current_user)
    elif list_element_action == 'delete':
        list_element_id = request.get_json()['id']
        return list_utilities.delete_from_list(list_element_id, g.current_user)
    else:
        abort(500, "No valid action provided.")
