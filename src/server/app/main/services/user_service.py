from app.main.models.UsersModel import UserModel
from app.main import login_manager, db
import uuid
import datetime


@login_manager.user_loader
def load_user(user_id):
    """
    [summary]

    Args:
        user_id ([type]): [description]

    Returns:
        [type]: [description]
    """
    return UserModel.query.get(int(user_id))


def save_new_user(data):
    user = UserModel.query.filter_by(email=data['email']).first()
    if not user:
        new_user = UserModel(
            public_id=str(uuid.uuid4()),
            email=data['email'],
            name=data['name'],
            password=data.get('password', None)
        )
        save_changes(new_user)
        response_object = {
            'status': 'success',
            'message': 'Successfully registered.'
        }
        return response_object, 201
    else:
        response_object = {
            'status': 'fail',
            'message': 'User already exists. Please Log in.',
        }
        return response_object, 200


def get_all_users():

    users = UserModel.query.all()
    data = []
    for user in users:
        temp_dict = {}
        temp_dict['name'] = user.name
        temp_dict['email'] = user.email
        temp_dict['id'] = user.id
        temp_dict['role'] = user.role
        ist_created_at = user.created_at - datetime.timedelta(minutes=-330)
        temp_dict['created_at'] = ist_created_at.strftime("%m-%d-%Y %H:%M:%S")
        data.append(temp_dict)

    return data

def login(email, password):
    user = UserModel.query.filter_by(email=email).first()


def get_one_user(public_id):
    return UserModel.query.filter_by(public_id=public_id).first()


def save_changes(data):
    try:
        db.session.add(data)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
