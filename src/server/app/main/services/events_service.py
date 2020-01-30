from ..models.EventsModel import EventsModel
from contests_challenges_service import get_contest_challenge_id

def save_changes(data):
    try:
        db.session.add(data)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False

def add_event(data,user_id):
    contests_challenges_id = get_contest_challenge_id(data['challenge_id'],data['contest_id'])
    
    new_assest = EventsModel(contests_challenges_id = contests_challenges_id,
                            event = data['event'],
                            event_text = data['text'],
                            user_id = user_id)
    
    return save_changes(new_assest)