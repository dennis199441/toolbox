from flask import Flask, jsonify, request

from entities.entity import Session
from entities.member import Member, MemberSchema
from entities.community import Community, CommunitySchema

from datetime import datetime
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (jwt_required, jwt_refresh_token_required, get_jwt_identity) 

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)

@app.route('/community', methods=['POST'])
@jwt_required
def create_community():
    community_name  = request.form.get('community_name')

    success = False
    result, messages =  {}, []
    community = Community(community_name)
    session = Session()
    community_count = session.query(Community).filter_by(community_name=community_name).count()
    
    if community_count > 0:
        messages.append("Community name is taken")
    
    if len(messages) == 0:
        try:
            session.add(community)
            session.commit()
            success = True
            messages.append('{} created'.format(community_name))
        except Exception as e:
            print('create community exception', e)
            session.rollback()
            messages.append('{} creation fail'.format(community_name))
    
    session.close()
    result['success'] = success
    result['message'] = messages    

    return jsonify(result)

@app.route('/community', methods=['GET'])
@jwt_required
def get_community():
    current_user = get_jwt_identity()
    username = current_user['username']
    community_name = request.args.get('community_name')
    print(community_name)
    session = Session()
    try:
        community_obj = session.query(Community).filter_by(community_name=community_name) 
        schema = CommunitySchema(many=True)
        community = schema.dump(community_obj)
    except Exception as e:
        print("get community error [community_name: {}]".format(community_name))
    finally:
        session.close()

    return jsonify(community.data)  

@app.route('/community_list', methods=['GET'])
@jwt_required
def get_community_list():
    current_user = get_jwt_identity()
    username = current_user['username']
    session = Session()
    try:
        community_obj = session.query(Community) 
        schema = CommunitySchema(many=True)
        community = schema.dump(community_obj)
    except Exception as e:
        print("get community list error")
    finally:
        session.close()

    return jsonify(community.data)  

@app.route('/update_community', methods=['POST'])
@jwt_required
def update_community():
    current_user = get_jwt_identity()
    username = current_user['username']
    now = datetime.now()
    result, messages ={}, []
    success = True
    old_community_name = request.args.get('old_community_name')
    new_community_name = request.args.get('new_community_name')
    session = Session()

    community_count = session.query(Community).filter_by(community_name=new_community_name).count()
    if community_count > 0:
        messages.append("New community name [{}] is taken".format(new_community_name))

    try:
        community_obj = session.query(Community).filter_by(community_name=old_community_name)
        if community_obj.count() == 1:
            community_obj.update({Community.community_name: new_community_name, Community.updated_at: now}, synchronize_session='fetch')
            session.commit()
            messages.append('Update community name success')
    except Exception as e:
        print('Update community name error: [community_name:{}]'.format(old_community_name))
        print(e)
        messages.append('Update community name error')
        success = False
        session.rollback()
    finally:
        session.close()
    
    result['success'] = success
    result['messages'] = messages

    return jsonify(result)

@app.route('/delete_community', methods=['GET'])
@jwt_required
def delete_community():
    current_user = get_jwt_identity()
    username = current_user['username']
    now = datetime.now()
    result, messages ={}, []
    success = True
    community_name = request.args.get('community_name')
    session = Session()

    try:
        community_obj = session.query(Community).filter_by(community_name=community_name)
        if community_obj.count() == 1:
            community_obj.delete()
            session.commit()
            messages.append('Delete community success: [{}]'.format(community_name))
    except Exception as e:
        print('Delete community error: [{}]'.format(community_name))
        print(e)
        messages.append('Delete community error')
        success = False
        session.rollback()
    finally:
        session.close()
    
    result['success'] = success
    result['messages'] = messages

    return jsonify(result)

@app.route('/member', methods=['POST'])
@jwt_required
def create_member():
    community_name = request.form.get('community_name')
    user_id = request.form.get('user_id')
    description = request.form.get('description')
    lat = request.form.get('lat')
    lng = request.form.get('lng')
    
    success = False
    result, messages =  {}, []
    session = Session()
    community_obj = session.query(Community).filter_by(community_name=community_name).one()
    
    try:
        community_obj = session.query(Community).filter_by(community_name=community_name).one()
        member = Member(community_obj.id, user_id, description, lat, lng)
        session.add(member)
        session.commit()
        success = True
        messages.append('Added user {} to community {}'.format(user_id, community_name))
    except Exception as e:
        print('create member exception', e)
        session.rollback()
        messages.append('Add {} to {} fail'.format(user_id, community_name))
    
    session.close()
    result['success'] = success
    result['message'] = messages    

    return jsonify(result)

@app.route('/update_member', methods=['POST'])
@jwt_required
def update_member():
    current_user = get_jwt_identity()
    username = current_user['username']
    community_name = request.form.get('community_name')
    user_id = request.form.get('user_id')
    description = request.form.get('description')
    lat = request.form.get('lat')
    lng = request.form.get('lng')
    now = datetime.now()
    result, messages ={}, []
    success = True

    session = Session()
    try:
        community_obj = session.query(Community).filter_by(community_name=community_name).one()
        member_obj = session.query(Member).filter_by(community_id=community_obj.id, user_id=user_id)
        if member_obj.count() == 1:
            member_obj.update({
                Member.description: description, 
                Member.updated_at: now,
                Member.lat: lat,
                Member.lng: lng,
            }, synchronize_session='fetch')
            session.commit()
            messages.append('Update community name success')
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
    community_name = request.args.get('community_name')
    user_id = request.args.get('user_id')
    session = Session()
    try:
        community_obj = session.query(Community).filter_by(community_name=community_name).one()
        member_obj = session.query(Member).filter_by(community_id=community_obj.id, user_id=user_id).one()
        schema = MemberSchema(many=False)
        member = schema.dump(member_obj)
    except Exception as e:
        print("get member error [community_name: {}, user_id: {}]".format(community_name, user_id))
        print(e)
    finally:
        session.close()

    return jsonify(member.data) 

@app.route('/member_list', methods=['GET'])
@jwt_required
def get_member_list():
    current_user = get_jwt_identity()
    username = current_user['username']
    community_name = request.args.get('community_name')
    session = Session()
    try:
        community_obj = session.query(Community).filter_by(community_name=community_name).one()
        member_obj = session.query(Member).filter_by(community_id=community_obj.id)
        schema = MemberSchema(many=True)
        member_list = schema.dump(member_obj)
    except Exception as e:
        print("get member list error [community_name: {}]".format(community_name))
    finally:
        session.close()

    return jsonify(member_list.data)  

@app.route('/delete_member', methods=['GET'])
@jwt_required
def delete_member():
    current_user = get_jwt_identity()
    community_name = request.args.get('community_name')
    user_id = request.args.get('user_id')

    now = datetime.now()
    result, messages ={}, []
    success = True
    session = Session()

    try:
        community_obj = session.query(Community).filter_by(community_name=community_name).one()
        member_obj = session.query(Member).filter_by(community_id=community_obj.id, user_id=user_id)
        if member_obj.count() == 1:
            member_obj.delete()
            session.commit()
            messages.append('Delete member {} from {} success]'.format(user_id, community_name))
    except Exception as e:
        print('Delete member from {} error: [{}]'.format(community_name, user_id))
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
