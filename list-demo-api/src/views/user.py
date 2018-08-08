from flask import Blueprint, request, jsonify
from flask_cors import CORS
from google.appengine.api import users

from src.utilities import user_utilities as uu

user_bp = Blueprint('user', __name__)
CORS(user_bp, origins="http://localhost:4200")


@user_bp.route('/login')
def login():
    if uu.is_user_logged_in():

        if not uu.is_user_in_datastore():
            uu.add_user_to_datastore()

    return jsonify(loginUrl=users.create_login_url(request.url))


@user_bp.route('/logout')
def logout():
    return jsonify(logoutUrl=users.create_logout_url(request.url))
