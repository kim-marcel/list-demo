from flask import Blueprint, request
from google.appengine.api import users
import json

from utilities import user_utilities as uu


user_bp = Blueprint('user', __name__)


@user_bp.route('/login')
def login():
    if uu.is_user_logged_in():

        if not uu.is_user_in_datastore():
            uu.add_user_to_datastore()

    return json.dumps({"loginUrl": users.create_login_url(request.url)})


@user_bp.route('/logout')
def logout():
    return json.dumps({"logoutUrl": users.create_logout_url(request.url)})
