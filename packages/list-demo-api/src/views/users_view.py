from flask import abort, Blueprint, g, jsonify
from flask_httpauth import HTTPTokenAuth

from src.utilities import list_utilities
from src.utilities import user_utilities

auth = HTTPTokenAuth('Bearer')
users_bp = Blueprint('users', __name__)


@auth.verify_token
def verify_token(id_token):
    current_user = user_utilities.get_current_user(id_token)
    if current_user:
        # save the the current user to the application context g
        g.current_user = current_user['user']
        g.current_user_id = current_user['user_id']
        return True
    return False


@users_bp.route('/users/<user_id>', methods=['DELETE'])
@auth.login_required
def delete(user_id):
    if user_id == g.current_user_id and g.current_user:
        list = g.current_user.list.get()
        list_utilities.delete_list(list)
        user_utilities.delete_user(g.current_user)
        return jsonify(responseCode=200, responseMessage="Successfully deleted user")
    else:
        abort(401, "Unauthorized Access")
