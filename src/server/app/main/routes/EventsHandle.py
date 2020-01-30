from flask import request
from flask_restful import Resource, reqparse
import requests
from app.main.services.decode_auth_token import decode_auth_token
from app.main.services.events_service import add_event

class EventsHandle(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('event', type=str,
                        required=True, help="Event is needed")
    parser.add_argument('text', type=str, required=True,
                        help="Message is needed")
    parser.add_argument('challenge_id', type=int, required=True,
                        help="Challenge id is needed")
    parser.add_argument('contest_id', type=int, required=True,
                        help="Contest id is needed")

    def get(self):
        auth_token = request.headers.get("Authorization")
        user_id = decode_auth_token(auth_token)
        
        if user_id:
            return {'success': True}
        else:
            return {'success': False, 'comment': 'Token Invalid or Expired'}
    
    def post(self):
        auth_token = request.headers.get("Authorization")
        user_id = decode_auth_token(auth_token)
        
        if user_id:
            data = EventsHandle.parser.parse_args()
            added_check = add_event(data, user_id)
            if added_check:
                return {'success': True, 'comment': 'Event Added'}, 200
            else:
                return {'success': False, 'comment': 'Error in adding event'}
        else:
            return {'success': False, 'comment': 'Token Invalid or Expired'}