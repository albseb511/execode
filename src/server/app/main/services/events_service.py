from ..models.EventsModel import EventsModel
from .contests_challenges_services import get_contest_challenge_id
from .. import db

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

def get_events(user_id):
    data_event = EventsModel.query.filter_by(EventsModel.user_id = user_id).all()
    events = []
    for row in data_event:
        events.append({
            "event": row.event,
            "text": row.event_text,
            "created_at": row.created_at.strftime("%m-%d-%Y %H:%M:%S")
        })
    return events