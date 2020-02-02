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
    data_event = db.engine.execute("select a.event as event, a.created_at as created_at, a.event_text as text, b.name as name, d.challenge_name from events as a join contests_challenges as c on c.id = a.contests_challenges_id join challenges as d on d.id = c.challenge_id join users as b on b.id = a.user_id where a.user_id = %s;"%(user_id))
    events = []
    for row in data_event:
        temp_dict = {}
        temp_dict['event'] = row.event
        temp_dict['text'] = row.text
        temp_dict['name'] = row.name
        temp_dict['challenge_name'] = row.challenge_name
        temp_dict['created_at'] = row.created_at.strftime("%m-%d-%Y %H:%M:%S")
        events.append(temp_dict)
    return events