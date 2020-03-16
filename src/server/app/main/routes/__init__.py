from app.main.routes.auth_controller import UserLogin, LogoutAPI, UserSignUp, FacebookAuthorize, GithubAuthorize, UserAll
from app.main import api
from app.main.routes.Contest import Contest, ContestEdit
from app.main.routes.UserLeaderboard import UserLeaderboard
from app.main.routes.AdminLeaderboard import AdminLeaderboard, SingleUserSubmissions
from app.main.routes.RuncodeResource import RuncodeResource
from app.main.routes.SubmitCodeResource import SubmitCodeResource, SubmitCodeResourceTestCaseList, SubmitCodeResourceTestCaseRun , SubmitCodeResourceUpdate
from app.main.routes.AllChallenge import AllChallenge
from app.main.routes.Challengeroute import Challenge, ChallengeEdit
from app.main.routes.Contests import Contests
from app.main.routes.SubmittedCode import SubmittedCode
from app.main.routes.JwtValidation import JwtValidation
from app.main.routes.EventsHandle import EventsHandle, EventsHandleAdd
from app.main.routes.SignUpContest import SignUpContest


def add_resources(app):
    """
    Method to add resources to app context

    Args:
        app (object): object of Flask representing the app in context
    """

    api.add_resource(UserLogin, '/login')
    api.add_resource(EventsHandle, '/event/<user_id>')
    api.add_resource(EventsHandleAdd, '/event')
    api.add_resource(UserAll, '/users') 
    api.add_resource(ChallengeEdit, '/challenge/<challenge_id>/editchallenge') 
    api.add_resource(ContestEdit, '/contest/<contest_id>/editcontest') 
    api.add_resource(SubmitCodeResourceTestCaseList, '/submitcodelist') 
    api.add_resource(SubmitCodeResourceTestCaseRun, '/testcaserun') 
    api.add_resource(SubmitCodeResourceUpdate, '/submitupdate') 
    api.add_resource(JwtValidation, '/validate') 
    api.add_resource(LogoutAPI, '/logout') 
    api.add_resource(UserSignUp, '/signup') 
    api.add_resource(FacebookAuthorize, '/facebook') 
    api.add_resource(GithubAuthorize, '/github')
    api.add_resource(SignUpContest, '/signupcontest') 
    api.add_resource(Contest, '/contest/<contest_name>') 
    api.add_resource(Contests, '/contests') 
    api.add_resource(UserLeaderboard, '/contest/<contest_id>/leaderboard') 
    api.add_resource(AdminLeaderboard,
                     '/contest/<contest_id>/leaderboard/<user_id>') 
    api.add_resource(SingleUserSubmissions,
                     '/contest/<contest_id>/leaderboard/singleuser') 
    api.add_resource(RuncodeResource, '/runcode') 
    api.add_resource(SubmitCodeResource, '/submit') 
    api.add_resource(Challenge, '/challenge/<challenge_id>') 
    api.add_resource(AllChallenge, '/challenges') 
    api.add_resource(
        SubmittedCode, '/contest/<contest_id>/leaderboard/<user_id>/code/<submission_id>') 


def register_blueprints(app):
    """
    Method to add blueprints to app context

    Args:
        app (object): object of Flask representing the app in context
    """
    pass
