from flask import Blueprint, request, abort
import json

from utilities import user_utilities as uu


list_bp = Blueprint('list', __name__)


@list_bp.route('/list')
def get_list():
    # check whether user is logged in and in datastore
    if uu.is_user_authorized():
        # Get content and add to response
        return json.dumps({"list": uu.get_list_of_user()})

    # if no user is logged return error
    else:
        abort(401)


@list_bp.route('/list', methods=['POST'])
def add_element_to_list():
    new_list_element = request.form['input']

    # check whether user is logged in and in datastore
    if uu.is_user_authorized():

        if new_list_element:
            uu.add_element_to_user_list(new_list_element)
            return json.dumps({"responseCode": "200", "responseMessage": "Successfully added to list"})
        else:
            return json.dumps({"responseCode": "200", "responseMessage": "Nothing was added to list"})

    # if no user is logged return error
    else:
        abort(401)

