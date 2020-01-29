# from app.main.models.ChallengesModel import ChallengesModel
from ..models.AttemptsModel import AttemptsModel
from ..models.ContestsChallengesModel import contests_challenges
from ..models.UsersModel import UserModel

from app.main import db
import uuid
import json


def get_raw_data(contest_id):

    data_raw = db.engine.execute("select total.user_id, total.total, total.contest_id, u.name, u.email from (select sum(max_score) as total, user_id, contest_id from attempts where contest_id = %s group by user_id) as total join users as u on u.id = total.user_id;"%(contest_id))
    print(data_raw)
    names = []
    #names = [dict(row) for  row in data_raw]
    for row in data_raw:
        temp_dict = {}
        temp_dict['contest_id'] = row['contest_id']
        temp_dict['user_id'] = row['user_id']
        temp_dict['total'] = int(row['total'])
        temp_dict['name'] = row['name']
        temp_dict['email'] = row['email']
        names.append(temp_dict)

    # print(names)
    resp = {"leaderboard": names,"comment":"success"}
    return resp