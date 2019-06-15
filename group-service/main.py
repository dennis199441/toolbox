from flask import Flask, jsonify, request

from entities.entity import Session
from entities.member import Member, MemberSchema
from entities.groups import Groups, GroupsSchema

from datetime import datetime
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (jwt_required, jwt_refresh_token_required, get_jwt_identity) 

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)

@app.route('/group', methods=['POST'])
@jwt_required
def add_group():
    current_user = get_jwt_identity()
    group_name  = request.form.get('group_name')
    group_desc = request.form.get('description')
    created_by = int(current_user['id'])

    success = False
    result, messages =  {}, []
    group = Groups(group_name, group_desc, created_by)
    session = Session()

    if len(messages) == 0:
        try:
            session.add(group)
            messages.append('{} created'.format(group_name))
            session.commit()

            member = Member(group.id, created_by, 'Creater', 'ADMIN')
            session.add(member)
            session.commit()

            messages.append('Added user {} to group {}'.format(created_by, group.id))
            success = True
        except Exception as e:
            print('create group exception', e)
            session.rollback()
            messages.append('{} creation fail'.format(group_name))
    
    session.close()
    result['success'] = success
    result['message'] = messages    

    return jsonify(result)

@app.route('/group', methods=['GET'])
@jwt_required
def get_group():
    current_user = get_jwt_identity()
    username = current_user['username']
    group_id = request.args.get('group_id')

    session = Session()
    try:
        group_obj = session.query(Groups).filter_by(id=group_id).one()
        schema = GroupsSchema(many=False)
        group = schema.dump(group_obj)
    except Exception as e:
        print("get group error [group_id: {}]".format(group_id))
    finally:
        session.close()

    return jsonify(group.data)  

@app.route('/group_list', methods=['GET'])
@jwt_required
def get_group_list():
    current_user = get_jwt_identity()
    username = current_user['username']
    session = Session()
    try:
        group_obj = session.query(Groups) 
        schema = GroupsSchema(many=True)
        group = schema.dump(group_obj)
    except Exception as e:
        print("get group list error")
    finally:
        session.close()

    return jsonify(group.data)  

@app.route('/update_group', methods=['POST'])
@jwt_required
def update_group():
    current_user = get_jwt_identity()
    username = current_user['username']
    now = datetime.now()
    result, messages ={}, []
    success = True
    group_id = request.args.get('group_id')
    group_name = request.args.get('group_name')
    group_desc = request.args.get('group_desc')
    session = Session()

    try:
        group_obj = session.query(Groups).filter_by(id=group_id)
        group_obj.update({
            Groups.group_name: group_name, 
            Groups.description: group_desc,
            Groups.updated_at: now
        }, synchronize_session='fetch')
        session.commit()
        messages.append('Update group name success')
    except Exception as e:
        print('Update group name error: [group_id:{}]'.format(group_id))
        print(e)
        messages.append('Update group name error')
        success = False
        session.rollback()
    finally:
        session.close()
    
    result['success'] = success
    result['messages'] = messages

    return jsonify(result)

@app.route('/remove_group', methods=['GET'])
@jwt_required
def remove_group():
    current_user = get_jwt_identity()
    username = current_user['username']
    now = datetime.now()
    result, messages ={}, []
    success = True
    group_id = request.args.get('group_id')
    session = Session()

    try:
        group_obj = session.query(Groups).filter_by(id=group_id)
        if group_obj.count() == 1:
            group_obj.delete()
            session.commit()
            messages.append('Delete group success: id=[{}]'.format(group_id))
    except Exception as e:
        print('Delete group error: id=[{}]'.format(group_id))
        print(e)
        messages.append('Delete group error')
        success = False
        session.rollback()
    finally:
        session.close()
    
    result['success'] = success
    result['messages'] = messages

    return jsonify(result)

@app.route('/member', methods=['POST'])
@jwt_required
def add_member():
    group_id = request.form.get('group_id')
    user_id = request.form.get('user_id')
    description = request.form.get('description')
    role = request.form.get('role')
    
    success = False
    result, messages =  {}, []
    session = Session()
    
    try:
        group_obj = session.query(Groups).filter_by(id=group_id).one()
        member = Member(group_obj.id, user_id, description, role)
        session.add(member)
        session.commit()
        success = True
        messages.append('Added user {} to group {}'.format(user_id, group_id))
    except Exception as e:
        print('create member exception', e)
        session.rollback()
        messages.append('Add {} to {} fail'.format(user_id, group_id))
    
    session.close()
    result['success'] = success
    result['message'] = messages    

    return jsonify(result)

@app.route('/update_member', methods=['POST'])
@jwt_required
def update_member():
    current_user = get_jwt_identity()
    username = current_user['username']
    group_id = request.form.get('group_id')
    user_id = request.form.get('user_id')
    description = request.form.get('description')
    role = request.form.get('role')
    now = datetime.now()
    result, messages ={}, []
    success = True

    session = Session()
    try:
        group_obj = session.query(Groups).filter_by(id=group_id).one()
        member_obj = session.query(Member).filter_by(group_id=group_obj.id, user_id=user_id)
        if member_obj.count() == 1:
            update_data = {}
            update_data[Member.updated_at] = now

            if description:
                update_data[Member.description] = description
            if role:
                update_data[Member.role] = role
            
            member_obj.update(update_data, synchronize_session='fetch')
            session.commit()
            messages.append('Update group name success')
    except Exception as e:
        print('Update member error: [user_id:{}]'.format(user_id))
        print(e)
        messages.append('Update member error')
        success = False
        session.rollback()
    finally:
        session.close()

    result['success'] = success
    result['messages'] = messages

    return jsonify(result)

@app.route('/member', methods=['GET'])
@jwt_required
def get_member():
    current_user = get_jwt_identity()
    username = current_user['username']
    group_id = request.args.get('group_id')
    user_id = request.args.get('user_id')
    session = Session()
    try:
        group_obj = session.query(Groups).filter_by(id=group_id).one()
        member_obj = session.query(Member).filter_by(group_id=group_obj.id, user_id=user_id).one()
        schema = MemberSchema(many=False)
        member = schema.dump(member_obj)
    except Exception as e:
        print("get member error [group_id: {}, user_id: {}]".format(group_id, user_id))
        print(e)
    finally:
        session.close()

    return jsonify(member.data) 

@app.route('/member_list', methods=['GET'])
@jwt_required
def get_member_list():
    current_user = get_jwt_identity()
    username = current_user['username']
    group_id = request.args.get('group_id')
    session = Session()
    try:
        group_obj = session.query(Groups).filter_by(id=group_id).one()
        member_obj = session.query(Member).filter_by(group_id=group_obj.id)
        schema = MemberSchema(many=True)
        member_list = schema.dump(member_obj)
    except Exception as e:
        print("get member list error [group_id: {}]".format(group_id))
    finally:
        session.close()

    return jsonify(member_list.data)  

@app.route('/remove_member', methods=['GET'])
@jwt_required
def remove_member():
    current_user = get_jwt_identity()
    group_id = request.args.get('group_id')
    user_id = request.args.get('user_id')

    now = datetime.now()
    result, messages ={}, []
    success = True
    session = Session()

    try:
        group_obj = session.query(Groups).filter_by(id=group_id).one()
        member_obj = session.query(Member).filter_by(group_id=group_obj.id, user_id=user_id)
        if member_obj.count() == 1:
            member_obj.delete()
            session.commit()
            messages.append('Delete member {} from {} success]'.format(user_id, group_id))
    except Exception as e:
        print('Delete member from {} error: [{}]'.format(group_id, user_id))
        messages.append('Delete member error')
        success = False
        session.rollback()
    finally:
        session.close()
    
    result['success'] = success
    result['messages'] = messages

    return jsonify(result)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8082, debug=True)
