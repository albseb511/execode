from app.main.models.UsersModel import UserModel
import requests

class Auth:
    @staticmethod
    def login_user(data):
        # import pdb; pdb.set_trace()
        try:
            # fetch the user data
            user = UserModel.query.filter_by(email=data.get('email')).first()
            if user and user.check_password(data.get('password')):
                auth_token = user.encode_auth_token(user.id, user.role)
                if auth_token:
                    response_object = {
                        'status': 'success',
                        'message': 'Successfully logged in.',
                        'Authorization': auth_token.decode(),
                        'role':user.role,
                        'email': user.email
                    }
                    return response_object, 200
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'email or password does not match.'
                }
                return response_object, 401

        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 200

    @staticmethod
    def logout_user(data):
        if data:
            auth_token = data
        else:
            auth_token = ''
        if auth_token:
            resp = UserModel.decode_auth_token(auth_token)
            if resp == True:

                response_object = {
                    'status': 'success',
                    'message': 'Token Deactivated'
                }
                return response_object, 200
            else:
                response_object = {
                    'status': 'fail',
                    'message': resp
                }
                return response_object, 401
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return response_object, 403
