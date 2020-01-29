from flask import request
from flask_restful import Resource
import requests
from app.main.services.decode_auth_token import decode_auth_token

class JwtValidation(Resource):

    def get(self):
        auth_token = request.headers.get("Authorization")
        user_id = decode_auth_token(auth_token)
        if user_id:
            return {'success': True}
        else:
            return {'success': False, 'comment': 'Token Invalid or Expired'}