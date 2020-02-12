from flask import request
from flask_restful import Resource
# from ..models.ChallengesModel import ChallengesModel
from ..services.admin_leaderboard_service import get_raw_data
from app.main.services.decode_auth_token import decode_auth_token

class AdminLeaderboard(Resource):
    """"
    Get Admin Leaderboard details 
        """
    @classmethod
    def get(cls,contest_id,user_id):
        """
            User per contest leaderboard details
        """
        # print(Challenges_details)
        return get_raw_data(contest_id,user_id)

class SingleUserSubmissions(Resource):
    """"
    Get Admin Leaderboard details 
        """
    @classmethod
    def get(cls,contest_id):
        auth_token = request.headers.get("Authorization")
        user_id = decode_auth_token(auth_token)
        if user_id:
            return get_raw_data(contest_id,user_id)
        else:
            return {"comment": "JWT Expired or Invalid"}, 200
        
