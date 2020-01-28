from .. import db
import datetime


class SubmissionsModel(db.Model):
    """
    [summary]

    Args:
        SubmissionsMixin ([type]): [description]
        db ([type]): [description]
    """
    __tablename__ = "submissions"

    id = db.Column(db.Integer, primary_key=True)
    code_file = db.Column(db.String(250), nullable=True)
    language_name = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime(timezone=False),
                           nullable=False, default=datetime.datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    contest_challenge_id = db.Column(db.Integer, db.ForeignKey(
        'contests_challenges.id'), nullable=False)
    score = db.Column(db.Integer, nullable=True)
    submission_outputs = db.relationship(
        'SubmissionOutputs', backref="submission", lazy=True)
    test_cases_info = db.Column(db.Text, nullable=True)
