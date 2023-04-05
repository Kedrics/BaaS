# imports
from __main__ import app, token_required#, mysql
from flask import jsonify, request
from datetime import datetime


# GET ticket information
@app.route('/api/tickets/<int:ticket_id>', methods=['GET'])
@token_required
def get_ticket(session_data, ticket_id):
    # get user_id from ticket_id
    # insert MySQL query here, return test data for the moment
    user_id = 123

    # ensure user is authorized to access the information
    if not session_data['is_staff'] and session_data['user_id'] != user_id:
        return jsonify({'message': 'You do not have permission to access this information'}), 403
    
    # get ticket information
    # insert MySQL query here, return test data for the moment
    data = {"ticket_id": ticket_id, "user_id": user_id, "description": "Test ticket", "messages":"no"}

    if not data:
        return jsonify({'message': 'Ticket not found'}), 404
    
    return jsonify(data), 200


# POST create a ticket
@app.route('/api/tickets', methods=['POST'])
@token_required
def post_create_ticket(session_data):
    # ensure needed parameters are present
    if (request.json is None) or ('description' not in request.json):
        return jsonify({'message': 'Missing required parameters'}), 400
    
    description = request.json['description']
    timestamp = datetime.utcnow().isoformat()

    # ensure parameters are integers
    if type(description) is not str:
        return jsonify({'message': 'Invalid parameter data'}), 400
    
    # insert ticket into database
    # insert MySQL query here, return test data for the moment
    response = {"ticket_id": 1, "description": description, "time_stamp": timestamp}

    return jsonify(response), 200


# POST add a message to a ticket
@app.route('/api/tickets/<int:ticket_id>', methods=['POST'])
@token_required
def post_add_message(session_data, ticket_id):
    # get user_id from ticket_id
    # insert MySQL query here, return test data for the moment
    user_id = 123

    # ensure user is authorized to access the information
    if not session_data['is_staff'] and session_data['user_id'] != user_id:
        return jsonify({'message': 'You do not have permission to access this information'}), 403

    # ensure needed parameters are present
    if (request.json is None) or ('message' not in request.json):
        return jsonify({'message': 'Missing required parameters'}), 400
    
    message = request.json['message']

    # ensure parameters are integers
    if type(message) is not str:
        return jsonify({'message': 'Invalid parameter data'}), 400
    
    # insert message into database
    # insert MySQL query here, return test data for the moment
    response = {"ticket_id": ticket_id, "message": message}

    return jsonify(response), 200