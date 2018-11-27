from flask import Flask
from flask_cors import CORS

from views import lists_bp
from views import users_bp

app = Flask(__name__)

CORS(app)

app.register_blueprint(lists_bp, url_prefix='/api')
app.register_blueprint(users_bp, url_prefix='/api')
