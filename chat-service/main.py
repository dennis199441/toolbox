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

@app.route('/private_msg', methods=['GET'])
@jwt_required
def private_message():
	sender  = request.args.get('sender_uid')
	receiver  = request.args.get('receiver_uid')
	return True

@app.route('/private_msg', methods=['POST'])
@jwt_required
def private_message():
	sender  = request.form.get('sender_uid')
	receiver  = request.form.get('receiver_uid')
	return True

@app.route('/group_msg', methods=['GET'])
@jwt_required
def group_message():
	current_user = get_jwt_identity()
	group_id = request.args.get('group_id')
	return True

@app.route('/group_msg', methods=['POST'])
@jwt_required
def group_message():
	sender  = request.form.get('sender_uid')
	group  = request.form.get('group_id')
	return True

if __name__ == '__main__':
	app.run(host='127.0.0.1', port=8084, debug=True)
