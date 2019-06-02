import json
from bson import ObjectId
from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (jwt_required, jwt_refresh_token_required, get_jwt_identity) 

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/profile-service"
mongo = PyMongo(app)
app.config['JWT_SECRET_KEY'] = 'jwt-secret-string'
jwt = JWTManager(app)

class JSONEncoder(json.JSONEncoder):
	def default(self, o):
		if isinstance(o, ObjectId):
			return str(o)
		return json.JSONEncoder.default(self, o)

@app.route('/profile', methods=['POST'])
@jwt_required
def create_profile():
	post_user_id = request.form.get('user_id')
	current_user = get_jwt_identity()
	user_id = current_user['id']
	result = {}
	status = None
	message = None
	if user_id is not None or user_id != int(post_user_id):
		data = request.form.to_dict(flat=True)
		data['user_id'] = int(data['user_id'])
		try:
			mongo.db.profiles.insert_one(data)
			status = 200
			message = 'Success'	
		except Exception as e:
			print(e)
			status = 500
			message = 'Insert data exception'		
	else:
		status = 500
		message = 'Empty user_id'

	result['status'] = status
	result['message'] = message

	return jsonify(result)

@app.route('/profile', methods=['GET'])
@jwt_required
def get_profile():
	current_user = get_jwt_identity()
	user_id = current_user['id']
	query = {"user_id": user_id}
	profiles = list(mongo.db.profiles.find(query))
	return JSONEncoder().encode(profiles)	

@app.route('/profile/<user_id>', methods=['PUT'])
def update_profile(user_id):
	result = {}
	status, message = None, None
	
	if user_id is not None:
		data = request.form.to_dict(flat=True)
		if 'user_id' not in data:
			new_values = {"$set": data}
			try:
				query = {'user_id': int(user_id)}
				mongo.db.profiles.update_one(query, new_values)
				status = 200
				message = 'Success'
			except Exception as e:
				print(e)
				status = 500
				message = 'Update data exception'
		else:
			status = 500
			message = 'Update user_id is not allowed'
	else:
		status = 500
		message = 'Empty user_id'
	
	result['status'] = status
	result['message'] = message
	
	return jsonify(result)

@app.route('/delete_profile/<user_id>', methods=['GET'])
def delete_profile(user_id):
	result = {}
	status, message = None, None
	
	if user_id is not None:
		try:
			query = {"user_id" : int(user_id)}
			mongo.db.profiles.delete_one(query)
			status = 200
			message = 'Success'
		except Exception as e:
			print(e)
			status = 500
			message = 'Delete data exception'
	else:
		status = 500
		message = 'Empty user_id'

	result['status'] = status
	result['message'] = message

	return jsonify(result)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8081, debug=True)
