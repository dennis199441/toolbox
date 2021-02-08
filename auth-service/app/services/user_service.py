from datetime import datetime
from passlib.hash import pbkdf2_sha256 as sha256
from ..entities.entity import Session
from ..entities.user import User, UserSchema


def update_last_login(username):
    session = Session()
    now = datetime.now()
    user_obj = session.query(User).filter_by(username=username)
    if user_obj.count() == 1:
        user_obj.update({
            User.last_login: now,
            User.updated_at: now
        }, synchronize_session='fetch')
        session.commit()
        session.close()
        return True
    session.close()
    return False


def activate_user(username):
    session = Session()
    now = datetime.now()
    user_obj = session.query(User).filter_by(username=username)
    if user_obj.count() == 1:
        user_obj.update({
            User.is_active: 1,
            User.updated_at: now
        }, synchronize_session='fetch')
        session.commit()
        session.close()
        return True
    session.close()
    return False


def deactivate_user(username):
    session = Session()
    now = datetime.now()
    user_obj = session.query(User).filter_by(username=username)
    if user_obj.count() == 1:
        user_obj.update({
            User.is_active: 0,
            User.updated_at: now
        }, synchronize_session='fetch')
        session.commit()
        session.close()
        return True
    session.close()
    return False


def change_user_password(username, password):
    hash_pw = sha256.hash(password)
    now = datetime.now()
    session = Session()
    user_obj = session.query(User).filter_by(username=username)
    if user_obj.count() == 1:
        user_obj.update(
            {User.password: hash_pw, User.updated_at: now}, synchronize_session='fetch')
        session.commit()
        session.close()
        return True
    session.close()
    return False


def get_user_info(username):
    session = Session()
    user_obj = session.query(User).filter_by(username=username).first()
    schema = UserSchema(many=False)
    user = schema.dump(user_obj)
    session.close()
    return user.data


def get_all_users():
    session = Session()
    user_obj = session.query(User)
    schema = UserSchema(many=True)
    user = schema.dump(user_obj)
    session.close()
    return user.data


def create_new_user(username, email, password):
    hash_pw = sha256.hash(password)
    user_obj = User(username, email, hash_pw)
    session = Session()
    session.add(user_obj)
    session.commit()
    schema = UserSchema(many=False)
    user = schema.dump(user_obj)
    session.close()
    return user.data