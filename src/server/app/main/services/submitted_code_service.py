# from app.main.models.ChallengesModel import ChallengesModel
from ..models.AttemptsModel import AttemptsModel
from ..models.ContestsChallengesModel import contests_challenges
from ..models.UsersModel import UserModel

from app.main import db
import uuid
import json


def get_raw_data(contest_id, user_id, submission_id):
    data_raw = db.engine.execute(("select code_file as code, test_case_info as tci from submissions where id = %s ")%(submission_id))

    print(data_raw)
    names = [dict(row) for row in data_raw]
    resp_data = {}
    f_code = open(names[0]['code'])
    resp_data['code_path'] = names[0]['code']
    resp_data['code'] = f_code.read()
    resp_data['comment'] = 'success'
    resp_data['test_case_info'] = names[0]['tci']
    return resp_data
