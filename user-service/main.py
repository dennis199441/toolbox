from flask import Flask, jsonify, request
from entities.entity import Session
from entities.user import User, UserSchema
from datetime import datetime
from passlib.hash import pbkdf2_sha256 as sha256
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)

@app.route('/auth/login', methods=['POST'])
def login():
    result = {}
    username = request.form.get('username')
    password = request.form.get('password')
    session = Session()
    
    user_obj = session.query(User).filter_by(username=username)
    if user_obj.count() == 1:
        schema = UserSchema(many=True)
        user = schema.dump(user_obj)
        identity = {}
        identity['id'] = user.data[0]['id']
        identity['email'] = user.data[0]['email']
        identity['username'] = user.data[0]['username']
        hash_pw = user.data[0]['password']
        if sha256.verify(password, hash_pw):
            access_token = create_access_token(identity=identity)
            refresh_token = create_refresh_token(identity=identity)
            result['messages'] = 'Logged in as {}'.format(username)
            result['access_token'] = access_token
            result['refresh_token'] = refresh_token
        else:
            result['messages'] = 'Authentication failed'
    else:
        retult['messages'] = 'Username not found'
    
    return jsonify(result)

@app.route('/activate/<username>', methods=['GET'])
def activate(username):
    now = datetime.now()
    result, messages = {}, []
    success = True
    session = Session()
    try:
        user_obj = session.query(User).filter_by(username=username)
        if user_obj.count() == 1:
            user_obj.update({User.is_active: 1, User.updated_at: now}, synchronize_session='fetch')
            session.commit()
            messages.append('User activated [username:{}]'.format(username))
    except Exception as e:
        print('Activate user error: [username:{}]'.format(username))
        print(e)
        messages.append('Activate user error')
        success = False
        session.rollback()
    finally:
        session.close()
    
    result['success'] = success
    result['messages'] = messages
    
    return jsonify(result)

@app.route('/deactivate/<username>', methods=['GET'])
def deactivate(username):
    now = datetime.now()
    result, messages = {}, []
    success = True
    session = Session()
    try:
        user_obj = session.query(User).filter_by(username=username)
        if user_obj.count() == 1:
            user_obj.update({User.is_active: 0, User.updated_at: now}, synchronize_session='fetch')
            session.commit()
            messages.append('User deactivated [username:{}]'.format(username))
    except Exception as e:
        print('Deactivate user error: [username:{}]'.format(username))
        print(e)
        messages.append('Deactivate user error')
        success = False
        session.rollback()
    finally:
        session.close()
    
    result['success'] = success
    result['messages'] = messages
    
    return jsonify(result)

@app.route('/change_password', methods=['POST'])
def change_password():
    username = request.form.get('username')
    password = request.form.get('password')
    hash_pw = sha256.hash(password)
    now = datetime.now()
    result, messages = {}, []
    success = True
    session = Session()
    try:
        user_obj = session.query(User).filter_by(username=username)
        if user_obj.count() == 1:
            user_obj.update({User.password: hash_pw, User.updated_at: now}, synchronize_session='fetch')
            session.commit()
            messages.append('Update password success')
    except Exception as e:
        print('Update password error: [username:{}]'.format(username))
        print(e)
        messages.append('Update password error')
        success = False
        session.rollback()
    finally:
        session.close()
    
    result['success'] = success
    result['messages'] = messages

    return jsonify(result)
    
@app.route('/user', methods=['GET'])
@jwt_required
def get_user():
    current_user = get_jwt_identity()
    username = current_user['username']
    session = Session()
    try:
        user_obj = session.query(User).filter_by(username=username) 
        schema = UserSchema(many=True)
        user = schema.dump(user_obj)
    except Exception as e:
        print("get user error [username: {}]".format(username))
    finally:
        session.close()

    return jsonify(user.data)    

@app.route('/user', methods=['POST'])
def create_user():
    username  = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    hash_pw = sha256.hash(password)
    
    success = False
    result, messages =  {}, []
    user = User(username, email, hash_pw)
    session = Session()
    username_count = session.query(User).filter_by(username=username).count()
    email_count = session.query(User).filter_by(email=email).count()
    
    if username_count > 0:
        messages.append("Username is taken")
    if email_count > 0:
        messages.append("Email is taken")
    
    if len(messages) == 0:
        try:
            session.add(user)
            session.commit()
            success = True
            messages.append('{} created'.format(username))
        except Exception as e:
            print('create user exception', e)
            session.rollback()
            messages.append('{} creation fail'.format(username))
    
    session.close()
    result['success'] = success
    result['message'] = messages    

    return jsonify(result)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
