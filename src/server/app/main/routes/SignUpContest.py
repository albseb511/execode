from flask import request
from flask_restful import Resource, reqparse
from app.main.services.decode_auth_token import decode_auth_token
from app.main.services.signup_contest import add_signup
from app.main import db

class SignUpContest(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('contest_id', type=str, required=False,
                        help="Contest Id is needed")

    @classmethod
    def post(self):
        # auth token 
        auth_token = request.headers.get("Authorization")
        user_id = decode_auth_token(auth_token)
        if user_id:
            data = SignUpContest.parser.parse_args()
            created = add_signup(data, user_id)
            if created:
                return {"comment": "signed up successfully"}, 200
            else:
                return {"comment": "error in signing up"}, 501
        else:
            return {"comment": "JWT Expired or Invalid"}, 401