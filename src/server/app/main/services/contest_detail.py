from app.main import db
from time import gmtime, strftime
import datetime
# from app import User

from app.main.models.ContestsModel import ContestsModel
from app.main.models.ChallengesModel import ChallengesModel
from app.main.models.AttemptsModel import AttemptsModel
from app.main.models.ContestsChallengesModel import contests_challenges
from app.main.services.test_cases_service import get_challenge_test_cases
import time


def save_changes(data):
    try:
        db.session.add(data)
        db.session.commit()
    except Exception as e:
        db.session.rollback()


def find_by_name(cls, contest_name):
    """
        Find by contest Name
        :param contest_name
        :return object containing all contest details
    """
    return cls.query.filter_by(contest_name=contest_name)


def get_contests_challenges(contest_id, user_id):
    data_raw = db.engine.execute(
        "select a.contest_name as contest_name, a.id as contest_id, a.start as start, a.end as end, a.details as details, a.max_score as contest_max_score, a.show_leaderboard as show_leaderboard, a.created_at as created_at, c.description as description, c.id as challenge_id, c.problem_statement as problem_statement, c.input_format as input_format, c.output_format as output_format, c.difficulty as difficulty, c.sample_input as sample_input, c.sample_output as sample_output, c.created_at as challenge_created_at, c.max_score as challenge_max_score from contests as a join contests_challenges as b on a.id=b.contest_id join challenges as c on b.challenge_id=c.id where a.id={}".format(contest_id))
    names = [dict(row) for row in data_raw]
    challenges_arr = []
    data = {}
    for i in names:

        challenge_data = {}
        data['contest_name'] = i['contest_name']
        data['contest_id'] = i['contest_id']
        data['start_date'] = str(i['start'].strftime("%m/%d/%Y"))
        data['start_time'] = str(i['start'].strftime("%H:%M"))
        data['end_date'] = str(i['end'].strftime("%m/%d/%Y"))
        data['end_time'] = str(i['end'].strftime("%H:%M"))
        data['details'] = i['details']
        data['max_score'] = i['contest_max_score']
        data['show_leaderboard'] = i['show_leaderboard']
        data['created_at'] = str(i['created_at'])
        challenge_data['description'] = i['description']
        challenge_data['challenge_id'] = i['challenge_id']
        challenge_data['problem_statement'] = i['problem_statement']
        challenge_data['input_format'] = i['input_format']
        challenge_data['output_format'] = i['output_format']
        challenge_data['difficulty'] = i['difficulty']
        challenge_data['sample_input'] = i['sample_input']
        challenge_data['sample_output'] = i['sample_output']
        challenge_data['created_at'] = str(
            i['challenge_created_at'].strftime("%m/%d/%Y"))
        challenge_data['max_score'] = i['challenge_max_score']
        challenges_arr.append(challenge_data)

    submit_data = {}

    for challenge in challenges_arr:
        prev_attempt = AttemptsModel.query.filter_by(
            contest_id=contest_id, user_id = user_id, challenge_id = challenge['challenge_id']).first()
        if prev_attempt:
            if prev_attempt.max_score == challenge['max_score']:
                challenge['submit_status'] = True
            else:
                challenge['submit_status'] = False
        else:
            challenge['submit_status'] = None


    resp = {"data": challenges_arr, "contest_data": data, "submit_data": submit_data}
    return resp

def get_contests():
    print('in the contest')
    resp_data = []
    result_data = db.engine.execute("select *from contests")
    final_val = [dict(row) for row in result_data]
    print(final_val)
    for j in final_val:
        data = {}
        data["id"] = j['id']
        data["contest_name"] = j['contest_name']
        data['start_date'] = str(j['start'].strftime("%m/%d/%Y"))
        data['start_time'] = str(j['start'].strftime("%H:%M"))
        data['end_date'] = str(j['end'].strftime("%m/%d/%Y"))
        data['end_time'] = str(j['end'].strftime("%H:%M"))
        data['details'] = j['details']
        data['show_leaderboard'] = j['show_leaderboard']
        data['created_at'] = str(j['created_at'].strftime("%m/%d/%Y %H:%M"))
        resp_data.append(data)
    resp = {"contests": resp_data}
    return resp


def add_contest(data, contest_name, user_id):
    end = data['end_date']+" "+data['end_time']
    start = data['start_date']+" "+data['start_time']
    total_marks = 0

    for challenge_id in data["challenge_ids"]:
        test_cases = get_challenge_test_cases(challenge_id)
        for test_case in test_cases:
            total_marks = total_marks + int(test_case['strength'])


    new_asset = ContestsModel(contest_name=contest_name,
                                start=start,
                                end=end,
                                details=data["details"],
                                show_leaderboard=data["show_leaderboard"],
                                owner = user_id,
                                max_score = total_marks)

    save_changes(new_asset)
    print('add contest saved')
    contest_id = new_asset.id
    if contest_id == None:
        return False

    print('challenges added')
    for challenge_id in data["challenge_ids"]:
        new_asset = db.engine.execute(
            "insert into contests_challenges (challenge_id,contest_id) values ({},{})".format(challenge_id, contest_id))
    return True

def update_contest(data, contest_name, user_id):
    contest = ContestsModel.query.filter_by(contest_name = contest_name).first()

    if contest.owner == user_id:
        #update
        end = data['end_date']+" "+data['end_time']
        start = data['start_date']+" "+data['start_time']

        db.session.query(ContestsModel).filter(ContestsModel.id == contest.id).update({ContestsModel.start : start, ContestsModel.end : end, ContestsModel.details : data['details'], ContestsModel.show_leaderboard : data['show_leaderboard']})
        db.session.commit()

        challenges_db = []

        data_raw = db.engine.execute("select challenge_id from contests_challenges where contest_id = %s"%(contest.id))

        for row in data_raw:
            challenges_db.append(row['challenge_id'])

        for challenge_id in data["challenge_ids"]:
            if challenge_id in challenges_db:
                continue
            else:
                db.engine.execute("insert into contests_challenges (challenge_id,contest_id) values (%s,%s)"%(contest.id, challenge_id))

        deleted_challenges = []

        for cid in challenges_db:
            if cid in data['challenge_id']:
                continue
            else:
                db.execute.engine("Delete from contests_challenges where challenge_id = %s, contest_id = %s"%(cid, contest.id))
        return True
    else:
        print("User is not authorized for updating the contest!")
        return False