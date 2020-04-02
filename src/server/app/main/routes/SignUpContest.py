from flask import request
from flask_restful import Resource, reqparse
from app.main.services.decode_auth_token import decode_auth_token
from app.main.services.signup_contest import add_signup, validate_signup
from app.main.services.contest_detail import caesar_decrypt_raw
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
            return add_signup(data, user_id)
        else:
            return {"comment": "JWT Expired or Invalid"}, 200

class ValidateSignUp(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('contest_id_hash', type=str, required=False,
                        help="Contest Id is needed")

    @classmethod
    def post(self):
        # auth token 
        auth_token = request.headers.get("Authorization")
        user_id = decode_auth_token(auth_token)
        if user_id:
            data = ValidateSignUp.parser.parse_args()
            contest_id = caesar_decrypt_raw(data['contest_id_hash'])
            created = validate_signup(contest_id, user_id)
            if created:
                return {"signup": True, "comment": "sign up already present"}, 200
            else:
                return {"signup": False, "comment": "No sign up found"}, 200
        else:
            return {"comment": "JWT Expired or Invalid"}, 200