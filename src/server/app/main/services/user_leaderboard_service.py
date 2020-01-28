# from app.main.models.ChallengesModel import ChallengesModel
from ..models.AttemptsModel import AttemptsModel
from ..models.ContestsChallengesModel import contests_challenges
from ..models.UsersModel import UserModel

from app.main import db
import uuid
import json


def get_raw_data(contest_id):

    data_raw = db.engine.execute("select a.max_score,c.name,c.id from attempts where contest_id='%s'"%(contest_id))
    print(data_raw)
    names = [dict(row) for  row in data_raw]
    # print(names)
    resp = {"leaderboard": names,"comment":"success"}
    return resp