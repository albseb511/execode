from .. import db
import datetime

class SignUpContestModel(db.Model):

    __tablename__ = 'signup_contest'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(timezone=True),
                           nullable=False, default=datetime.datetime.now())
    contest_id = db.Column(db.Integer, db.ForeignKey(
        'contests.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)