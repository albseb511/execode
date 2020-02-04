from flask_restful import Resource, reqparse
from flask import request
from app.main.services.decode_auth_token import decode_auth_token
from app.main.utils.run_code_util import getResults
from app.main.services.challenge_details_service import getDetailsById


class RuncodeResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('challenge_id', type=int,
                        required=True, help="Challenge ID is needed")
    parser.add_argument('code', type=str, required=True, help="Code is needed")
    parser.add_argument('language', type=str, required=True, help="language is needed")

    def post(self):
        auth_token = request.headers.get("Authorization")
        user_id = decode_auth_token(auth_token)

        if user_id:
            data = RuncodeResource.parser.parse_args()
            details = getDetailsById(data["challenge_id"])
            output_resp = list()
            if details:
                output, error, is_correct = getResults(
                    details.sample_input, details.sample_output, data['language'], user_id, data["code"])
                
                if len(error) != 0:
                    return {
                    "comment": "runcode successful",
                    "user_output": "",
                    "user_error": error,
                    "sample_result": False,
                    "is_error": True
                }, 200
                
                if output == False:
                    return {
                    "comment": "runcode not successful",
                    "user_output": "",
                    "user_error": "Timeout Exception",
                    "sample_result": False,
                    "is_error": True
                }, 200
                output_resp.append(output.strip())
                
                return {
                    "comment": "runcode successful",
                    "user_output": output_resp,
                    "user_error": error,
                    "sample_result": is_correct,
                    "is_error": False
                }, 200
            else:
                return {"comment": "Incorrect Challenge Id", "error": True}, 404
        else:
            return {"comment": "User not Found or jwt expired"}, 401
