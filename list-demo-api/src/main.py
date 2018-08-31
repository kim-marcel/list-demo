from flask import Flask
from requests_toolbelt.adapters import appengine

from views import list_bp

# Patch to use requests module with GAE (see: https://stackoverflow.com/questions/9604799/can-python-requests-library
# -be-used-on-google-app-engine/37304524#37304524)
appengine.monkeypatch()

app = Flask(__name__)

app.register_blueprint(list_bp, url_prefix='/api')
