from google.oauth2 import id_token
from google.auth.transport import requests
from requests_toolbelt.adapters import appengine

# Patch to use requests module with GAE (see: https://stackoverflow.com/questions/9604799/can-python-requests-library
# -be-used-on-google-app-engine/37304524#37304524)
appengine.monkeypatch()

HTTP_REQUEST = requests.Request()


# Returns id_info if token can be successfully verified, else None
def verify_token(token):
    try:
        claims = id_token.verify_firebase_token(token, HTTP_REQUEST)

        if claims:
            return claims

    except (ValueError, TypeError):
        # invalid id_token
        return None


def get_id_info(token):
    return verify_token(token)
