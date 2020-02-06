from flask_restful import Resource, reqparse
from flask import request
from app.main.services.decode_auth_token import decode_auth_token
import os
from app.main.services.contests_challenges_services import get_contest_challenge_id
from app.main.services.test_cases_service import get_challenge_test_cases
from app.main.services.submitcode_service import add_submission, update_submission, add_submission_output
from app.main.services.attempts_service import get_prev_best_attempt
from app.main.utils.submitcode_util import get_results, make_submit_folder, make_marks_file, get_result_test_case, update_submission_marks, update_submission_code_file_path
from app.main.utils.run_code_util import is_error, make_python_codefile, generate_output_error, compare_output, make_js_file, make_cpp_file
from app.main.services.challenge_details_service import getDetailsById
from app.main.services.attempts_service import add_new_best_attempt
from ..models.ChallengeSettingsModel import ChallengeSettings



class SubmitCodeResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('challenge_id', type=int, required=True,
                        help="Challenge ID cannot be left blank")
    parser.add_argument('contest_id', type=int,
                        required=True, help="Contest ID is needed")
    parser.add_argument('code', type=str, required=True,
                        help="Code is needed before submission")
    parser.add_argument('language', type=str, required=True,
                        help="Language is needed")

    def post(self):
        auth_token = request.headers.get("Authorization")
        user_id = decode_auth_token(auth_token)
        if user_id:
            data = SubmitCodeResource.parser.parse_args()
            # get contest_challenge_id
            contest_challenge_id = get_contest_challenge_id(
                data["challenge_id"], data["contest_id"])
            if contest_challenge_id:
                # add the sumission to db and get back id
                submission_id = add_submission(
                    data["language"], user_id, contest_challenge_id)
                # get total challenge marks alloted
                challenge_marks = getDetailsById(data["challenge_id"]).max_score

                # get all test_cases
                test_cases = get_challenge_test_cases(data["challenge_id"])

                # run the file and get all details
                submission_outputs, code_file_path, total_marks = get_results(
                    submission_id, test_cases, data["code"], data["language"], challenge_marks)
                # add to submission outputs
                if submission_outputs:
                    update_submission(submission_id, code_file_path)
                    for submission_output in submission_outputs:
                        new_submission_output = add_submission_output(
                            **submission_output)
                    # add new best attempt
                    add_new_best_attempt(
                        data["contest_id"], total_marks, submission_id, user_id, data["challenge_id"])
                    return {
                        "total_marks": total_marks,
                        "test_case_result": submission_outputs,
                        "comment": "Code Submitted ,here are your results"
                    }, 201
                else:
                    return {"comment": "No output"}, 400
        else:
            return {"comment": "User not Found or jwt expired"}, 401

class SubmitCodeResourceTestCaseList(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('challenge_id', type=int, required=True,
                        help="Challenge ID cannot be left blank")
    parser.add_argument('contest_id', type=int,
                        required=True, help="Contest ID is needed")
    parser.add_argument('code', type=str, required=True,
                        help="Code is needed before submission")
    parser.add_argument('language', type=str, required=True,
                        help="Language is needed")

    def post(self):
        auth_token = request.headers.get("Authorization")
        user_id = decode_auth_token(auth_token)
        if user_id:
            data = SubmitCodeResourceTestCaseList.parser.parse_args()
            # get contest_challenge_id

            contest_challenge_id = get_contest_challenge_id(
                data["challenge_id"], data["contest_id"])

            if contest_challenge_id:
                # add the sumission to db and get back id
                submission_id = add_submission(
                    data["language"], user_id, contest_challenge_id)
                # get total challenge marks alloted
                challenge_marks = getDetailsById(data["challenge_id"]).max_score

                settings_data_ent = ChallengeSettings.query.filter_by(challenge_id=data['challenge_id'], language_name = data['language']).first()

                # get all test_cases
                test_cases = get_challenge_test_cases(data["challenge_id"])

                path = make_submit_folder(submission_id)

                if data['language'] == 'python':
                    code_file_path = make_python_codefile(data['code'], path)
                elif data['language'] == 'javascript':
                    code_file_path = make_js_file(data['code'], path)
                elif data['language'] == 'cpp':
                    code_file_path = make_cpp_file(data['code'], path)
                else:
                    return {'status':'fail',
                            'comment':'language not supported'}

                updated_code_path = update_submission_code_file_path(code_file_path, submission_id)

                if updated_code_path == False:
                    return {'status':'fail',
                            'comment':'unable to update code_file_path'}

                marks_file_path = make_marks_file(path)


                return {'status':'ok',
                        'test_cases':test_cases,
                        'time_limit': settings_data_ent.time_limit,
                        'submission_id':submission_id,
                        'path':path,
                        'code_file_path':code_file_path}
            else:
                return {'status': 'fail', 'comment': 'error in fetching test cases, contest_challenge_id not found'}
        else:
            return {"comment": "User not Found or jwt expired"}, 401

class SubmitCodeResourceTestCaseRun(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('input_file', type=str, required=True,
                        help="Input File cannot be left blank")
    parser.add_argument('output_file', type=str,
                        required=True, help="Output file is needed")
    parser.add_argument('language', type=str, required=True,
                        help="Language is needed")
    parser.add_argument('path', type=str, required=True,
                        help="path is needed")
    parser.add_argument('code_file_path', type=str, required=True,
                        help="code_file_path is needed")
    parser.add_argument('strength', type=int, required=True,
                        help="strength is needed")
    parser.add_argument('test_id', type=int, required=True,
                        help="test_id is needed")

    def post(self):
        auth_token = request.headers.get("Authorization")
        user_id = decode_auth_token(auth_token)
        if user_id:
            data = SubmitCodeResourceTestCaseRun.parser.parse_args()

            output, error, is_correct = get_result_test_case(
                    data['path'], data['code_file_path'],data['input_file'], data['output_file'], data['language'], data["strength"], data['test_id'])

            if len(error) != 0:
                return {
                "comment": "runcode successful",
                "user_output": "",
                "user_error": error,
                "sample_result": False,
                "is_error": True,
                "test_case_id": data['test_id']
            }, 200

            if output == False:
                return {
                "comment": "runcode not successful",
                "user_output": "",
                "user_error": "Timeout Exception",
                "sample_result": False,
                "is_error": True,
                "test_case_id": data['test_id']
            }, 200

            return {
                "comment": "runcode successful",
                "user_output": output,
                "user_error": error,
                "sample_result": is_correct,
                "is_error": False,
                "test_case_id": data['test_id']
            }, 200

        else:
            return {"comment": "User not Found or jwt expired"}, 401

class SubmitCodeResourceUpdate(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('path', type=str, required=True,
                        help="path cannot be left blank")
    parser.add_argument('submission_id', type=int,
                        required=True, help="Submission id is needed")
    parser.add_argument('test_case_info', type=str, required=True, help = 'test_case_info is needed')
    parser.add_argument('contest_id', type=int,
                        required=True, help="contest id is needed")
    parser.add_argument('challenge_id', type=int,
                        required=True, help="Challenge id is needed")

    def post(self):
        auth_token = request.headers.get("Authorization")
        user_id = decode_auth_token(auth_token)
        if user_id:
            data = SubmitCodeResourceUpdate.parser.parse_args()
            updated, total_marks = update_submission_marks(data['path'], data['submission_id'], data['test_case_info'])

            if updated:
                add_new_best_attempt(
                        data["contest_id"], total_marks, data['submission_id'], user_id, data["challenge_id"])
                return{'status':'ok', 'comment':'marks updated'}
            else:
                return{'status':'fail', 'comment': 'error in updation'}

        else:
            return {'status':'fail', 'comment':'user not found or jwt expired'}