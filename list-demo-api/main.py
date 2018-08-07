from flask import Flask, request

app = Flask(__name__)


@app.route('/api/list')
def get_list():
    return '{"list": ["milch", "eier", "brot"]}'


@app.route('/api/list', methods=['POST'])
def add_element_to_list():
    element = request.form['element']
    return element + ' was successfully added to the list!'
