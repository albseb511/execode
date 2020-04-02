from flask import request
from flask_restful import Resource, reqparse
from ..services.contest_detail import get_contests_challenges, get_contests, add_contest, update_contest, caesar_encrypt_raw, caesar_decrypt_raw
from app.main.services.decode_auth_token import decode_auth_token
from app.main import db
from ..services.signup_contest import validate_signup

class Contest(Resource):
    """"
    Get contest details 
    Create contest
    """
    parser = reqparse.RequestParser()
    parser.add_argument('start_date', type=str,
                        required=True, help="Start Date is needed")
    parser.add_argument('end_date', type=str, required=True,
                        help="End Date is needed")
    parser.add_argument('start_time', type=str,
                        required=True, help="End Time is needed")
    parser.add_argument('end_time', type=str, required=True,
                        help="End Time is needed")
    parser.add_argument('details', type=str, required=True,
                        help="Details is needed")
    parser.add_argument('action', type=str, required=False,
                        help="Action is needed")
    parser.add_argument('show_leaderboard', type=bool,
                        required=True, help="Show leaderboard is needed")
    parser.add_argument('challenge_ids', type=list,
                        required=True, location='json', help="Challenges cannot be empty")

    @classmethod
    def post(self, contest_name):
        # auth token 
        auth_token = request.headers.get("Authorization")
        user_id = decode_auth_token(auth_token)
        if user_id:
            data = Contest.parser.parse_args()
            # Add contest to database
            created = add_contest(data, contest_name, user_id)
            if created:
                return {"comment": "contest created successfully"}, 200
            else:
                return {"comment": "error in contest creation"}, 501
        else:
            return {"comment": "JWT Expired or Invalid"}, 401

class ContestGet(Resource):

    @classmethod
    def get(self, contest_id_encoded):
        """
            Contest details
        """
        # check authentication header
        # check user role
        # print(contest_name)
        # contests_details = ContestsModel.get_contests_challenges(contest_name)
        # print(contests_details)
        # return {"message": "data"}
        auth_token = request.headers.get("Authorization")
        user_id = decode_auth_token(auth_token)

        if user_id:
            print(contest_id_encoded)
            print(user_id)
            print('-----------------')

            contest_id = caesar_decrypt_raw(contest_id_encoded)
            is_signed_up = validate_signup(contest_id, user_id)
            if is_signed_up:
                
                
                return get_contests_challenges(contest_id, user_id)
            else:
                return {"comment": "please redirect user to the signup page",
                        "error": True, 
                        "redirect": True,
                        "url": "/contest/%s"%(contest_id_encoded)}, 403
        else:
            return {"comment": "JWT Expired or Invalid", "error": True, "redirect": False}, 200


class Contests(Resource):
    @classmethod
    def get(self):
        return get_contests()


class ContestEdit(Resource):
    """"
    Get contest details 
    Create contest
    """
    parser = reqparse.RequestParser()
    parser.add_argument('start_date', type=str,
                        required=True, help="Start Date is needed")
    parser.add_argument('end_date', type=str, required=True,
                        help="End Date is needed")
    parser.add_argument('start_time', type=str,
                        required=True, help="End Time is needed")
    parser.add_argument('end_time', type=str, required=True,
                        help="End Time is needed")
    parser.add_argument('details', type=str, required=True,
                        help="Details is needed")
    parser.add_argument('show_leaderboard', type=bool,
                        required=True, help="Show leaderboard is needed")
    parser.add_argument('contest_name', type=str, required=False,
                        help="contest Name is needed")


    @classmethod
    def post(self, contest_id):
        auth_token = request.headers.get("Authorization")
        user_id = decode_auth_token(auth_token)
        if user_id:
            data = ContestEdit.parser.parse_args()
            updated = update_contest(data, contest_name, user_id)
            if updated:
                return {'status': 'ok',"comment": "contest updated successfully"}, 200
            else:
                return {'status': 'fail',"comment": "error in contest updation"}, 200