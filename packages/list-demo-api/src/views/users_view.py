from flask import abort, Blueprint, g, jsonify
from flask_httpauth import HTTPTokenAuth

from src.utilities import auth_utilities
from src.utilities import user_utilities

auth = HTTPTokenAuth('Bearer')
users_bp = Blueprint('users', __name__)


@auth.verify_token
def verify_token(id_token):
    user_info = auth_utilities.verify_token(id_token)
    # save the id of the current user to the application context g
    g.current_user_id = user_utilities.get_user_id(user_info)

    # check whether user is logged in and in datastore
    if user_utilities.is_user_authorized(g.current_user_id):
        return True
    return False


@users_bp.route('/users/<user_id>', methods=['DELETE'])
@auth.login_required
def delete(user_id):
    if user_id == g.current_user_id:
        user_utilities.delete_all_list_entries(g.current_user_id)
        user_utilities.delete_user_list(g.current_user_id)
        user_utilities.delete_user(g.current_user_id)
        return jsonify(responseCode=200, responseMessage="Successfully deleted user")
    else:
        abort(401, "Unauthorized Access")
