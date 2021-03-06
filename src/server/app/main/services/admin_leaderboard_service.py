# from app.main.models.ChallengesModel import ChallengesModel
from ..models.AttemptsModel import AttemptsModel
from ..models.ContestsChallengesModel import contests_challenges
from ..models.UsersModel import UserModel
from app.main.models.ContestsModel import ContestsModel
from app.main import db
import uuid
import json
import datetime


def get_raw_data(contest_id,user_id):
    data_raw = db.engine.execute("select a.id as submission_id, a.score as score, c.id as challenge_id,c.challenge_name ,d.name, a.created_at as created_at,  e.contest_name from submissions as a join contests_challenges as b  on a.contest_challenge_id=b.id join challenges as c on c.id = b.challenge_id join users as d on d.id = a.user_id join contests as e on e.id = b.contest_id where b.contest_id = '{}' and a.user_id = '{}' ORDER BY YEAR(a.created_at) DESC, MONTH(a.created_at) DESC, DAY(a.created_at) DESC, HOUR(a.created_at) DESC, MINUTE(a.created_at) DESC, SECOND(a.created_at) DESC, a.id DESC;".format(contest_id,user_id))
    print(data_raw)

    contest_entity = ContestsModel.query.filter_by(id=contest_id).first()
    start_time = contest_entity.start
    seconds_in_day = 24 * 60 * 60
    names = []
    #names = [dict(row) for  row in data_raw]
    for row in data_raw:
        temp_dict = {}
        temp_dict['submission_id'] = row['submission_id']
        temp_dict['challenge_id'] = row['challenge_id']
        temp_dict['challenge_name'] = row['challenge_name']
        temp_dict['name'] = row['name']
        difference = row['created_at'] - start_time
        temp_dict['time_taken'] = divmod(difference.days * seconds_in_day + difference.seconds, 60)
        ist_created_at = row['created_at'] - datetime.timedelta(minutes=-330)
        temp_dict['created_at'] = ist_created_at.strftime("%m-%d-%Y %H:%M:%S")
        temp_dict['score'] = row['score']
        temp_dict['contest_name'] = row['contest_name']
        names.append(temp_dict)
    # print(names)
    resp = {"challenges": names,"comment":"success"}
    return resp