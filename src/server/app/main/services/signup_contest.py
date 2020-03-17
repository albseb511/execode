from app.main import db
import datetime

from app.main.models.SignUpContestModel import SignUpContestModel

def save_changes(data):
    try:
        db.session.add(data)
        db.session.commit()
        print('saved!!')
    except Exception as e:
        db.session.rollback()
        print('not saved!!')
        print(e)

def add_signup(data, user_id):
    new_asset = SignUpContestModel(contest_id=data['contest_id'],
                            user_id = user_id)

    save_changes(new_asset)
    print('add signup saved')
    signup_id = new_asset.id
    if signup_id == None:
        return False
    else:
        return True