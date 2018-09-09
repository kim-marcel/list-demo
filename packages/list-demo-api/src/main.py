from flask import Flask
from flask_cors import CORS

from views import list_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(list_bp, url_prefix='/api')
