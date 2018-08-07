from flask import Blueprint, request

list_bp = Blueprint('list', __name__)


@list_bp.route('/list')
def get_list():
    return '{"list": ["milch", "eier", "brot"]}'


@list_bp.route('/list', methods=['POST'])
def add_element_to_list():
    element = request.form['element']
    return element + ' was successfully added to the list!'
