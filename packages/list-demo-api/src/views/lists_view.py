from flask import abort, Blueprint, g, jsonify, request, Response
from flask_httpauth import HTTPTokenAuth

from src.utilities import list_utilities
from src.utilities import user_utilities

auth = HTTPTokenAuth('Bearer')
lists_bp = Blueprint('lists', __name__)


@auth.verify_token
def verify_token(id_token):
    current_user = user_utilities.get_current_user(id_token)
    if current_user:
        # save the the current user to the application context g
        g.current_user = current_user['user']
        g.current_user_id = current_user['user_id']
        g.current_user_info = current_user['user_info']
        return True
    return False


@lists_bp.route('/lists', methods=['GET'])
@auth.login_required
def get():
    user_id = request.args.get('userId')
    if user_id == g.current_user_id and user_utilities.is_email_verified(g.current_user_info):
        # if user is not yet in the datastore add user to datastore
        if not user_utilities.is_user_in_datastore(user_id):
            user_utilities.add_user_to_datastore(user_id)
        return jsonify(list_utilities.get_list_by_user_id(user_id))
    abort(401, "Unauthorized Access")


@lists_bp.route('/lists/<list_id>', methods=['POST'])
@auth.login_required
def post(list_id):
    # make sure that a user can only manipulate his own list
    if user_utilities.is_users_list(g.current_user, list_id) and user_utilities.is_email_verified(g.current_user_info):
        list_element = request.get_json()['input']
        if list_utilities.add_to_list(list_id, list_element):
            return Response(status=200)
    else:
        abort(401, "Unauthorized Access")
    abort(500)


@lists_bp.route('/lists/<list_id>/<list_element_id>', methods=['DELETE'])
@auth.login_required
def delete(list_id, list_element_id):
    # make sure that a user can only manipulate his own list
    if user_utilities.is_users_list(g.current_user, list_id) and user_utilities.is_email_verified(g.current_user_info):
        if list_utilities.delete_from_list(list_id, list_element_id):
            return Response(status=200)
    else:
        abort(401, "Unauthorized Access")
    abort(500)
