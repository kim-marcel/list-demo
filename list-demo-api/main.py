from flask import Flask

from views.list import list_bp
from views.user import user_bp

app = Flask(__name__)
app.register_blueprint(list_bp, url_prefix='/api')
app.register_blueprint(user_bp, url_prefix='/api')
