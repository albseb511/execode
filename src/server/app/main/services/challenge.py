from app.main import db
from app.main.models.ChallengesModel import ChallengesModel
from app.main.models.ChallengeSettingsModel import ChallengeSettings
from app.main.models.TestCasesModel import TestCasesModel
from app.main.models.ChallengeSettingsModel import ChallengeSettings
import datetime

# from app import User
from app.main.models.UsersModel import UserModel
import jwt
from app.main.settings import key
from app.main.models.ChallengeSettingsModel import ChallengeSettings

def save_changes(data):
    try:
        db.session.add(data)
        db.session.commit()
    except Exception as e:
        print(e)
        db.session.rollback()

# def get_challenge(data,challenge_name):

def get_challenge(challenge_id):
    challenge = ChallengesModel.query.filter_by(id = challenge_id).first()
    #challenege1 = db.engine.execute("select * from challenges join test_cases on challenges.id = test_cases.challenge_id join challenge_settings on challenge_settings.challenge_id = challenges.id")
    #print(challenege1)
    # print(challenge)
    details = {
        "challenge_name":challenge.challenge_name,
         "challenge_id":challenge_id,
         "challenge_description": challenge.description,
         "problem_statement":challenge.problem_statement,
         "input_format":challenge.input_format,
         "output_format":challenge.output_format,
         "difficulty":challenge.difficulty,
         "sample_input":challenge.sample_input,
         "sample_output":challenge.sample_output,
         "constraints":challenge.constraints
         }
    return {"challenge":details}   

def add_challenge(description,problem_statement,input_format,output_format,constraints,difficulty,sample_input,sample_output,challenge_name, user_id, max_score):   #This service is us   ed to add both the challenge and required test cases for it.
    
    new_asset = ChallengesModel(challenge_name = challenge_name,
                                description = description,
                                problem_statement = problem_statement,
                                input_format = input_format, 
                                output_format = output_format,
                                difficulty = difficulty,
                                sample_input = sample_input,
                                sample_output = sample_output,
                                constraints = constraints,
                                owner = user_id, 
                                max_score = max_score)
    save_changes(new_asset)
    challengeid = new_asset.id
    return challengeid

def edit_challenge(data, challenge_id, user_id):

    challenge_details = ChallengesModel.query.filter_by(id = challenge_id).first()
    if challenge_details:
        if challenge_details.owner == user_id:
            try:
                db.session.query(ChallengesModel()).filter(ChallengesModel.id == challenge_id).update(
                                                                    {ChallengesModel.challenge_name : data['challenge_name'],
                                                                    ChallengesModel.description: data['description'],
                                                                    ChallengesModel.problem_statement : data['problem_statement'],
                                                                    ChallengesModel.input_format: data['input_format'],
                                                                    ChallengesModel.output_format: data['output_format'],
                                                                    ChallengesModel.constraints : data['constraints'],
                                                                    ChallengesModel.difficulty : data['difficulty'],
                                                                    ChallengesModel.sample_input : data['sample_input'],
                                                                    ChallengesModel.sample_output : data['sample_output']}
                                                                    )
                db.session.commit()
            except Exception as e:
                print(e)
                db.session.rollback()
                return {'status': 'fail', 'comment': 'database error'}
            return {'status': 'ok', 'comment': 'challenge updated'}

        else:
            return {'status': 'fail', 'comment': 'user not the owner of the challenge'}
    else:
        return {'status': 'fail', 'comment': 'no challenge found'}