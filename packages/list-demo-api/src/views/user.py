from flask import Blueprint, request, abort, jsonify

from src.utilities import auth
from src.utilities import user

user_bp = Blueprint('user', __name__)


@user_bp.route('/user', methods=['DELETE'])
def delete_user():
    # delete user, his list + all the list entries
    id_token = request.headers['Authorization'].split(' ').pop()
    user_info = auth.get_id_info(id_token)
    user_id = user.get_user_id(user_info)

    # check whether user is logged in and in datastore
    if user.is_user_authorized(user_id):
        user.delete_all_list_entries(user_id)
        user.delete_user_list(user_id)
        user.delete_user(user_id)
        return jsonify(responseCode=200, responseMessage="Successfully deleted user")

    # if no user is logged in return error
    else:
        abort(401)
