from flask import request
from flask_restful import Resource
from ..services.contest_detail import get_admin_contests
from app.main import db
from app.main.services.decode_auth_token import decode_auth_token


class AdminContest(Resource):
    @classmethod
    def get(self):
        auth_token = request.headers.get("Authorization")
        user_id = decode_auth_token(auth_token)
        if user_id:
            return get_admin_contests(user_id)
        else:
            return {"comment": "JWT Expired or Invalid"}, 200
