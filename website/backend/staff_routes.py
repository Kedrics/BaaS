# imports
from __main__ import app, token_required#, mysql
from flask import jsonify, request


# GET staff information
@app.route('/api/support-staff/<int:staff_id>', methods=['GET'])
@token_required
def get_staff(session_data, staff_id):
    # ensure user is authorized to access the information
    if not session_data['is_staff']:
        return jsonify({'message': 'You do not have permission to access this information'}), 403
    
    # get staff information
    # insert MySQL query here, return test data for the moment
    data = {"staff_id": staff_id, "user_id": 123, "is_developer": 1}

    if not data:
        return jsonify({'message': 'Staff member not found'}), 404
    
    return jsonify(data), 200


# POST add a staff member
@app.route('/api/support-staff', methods=['POST'])
@token_required
def post_add_staff(session_data):
    # ensure user is authorized to access the information
    if not session_data['is_staff']:
        return jsonify({'message': 'You do not have permission to access this information'}), 403
    
    # ensure needed parameters are present
    if (request.json is None) or ('user_id' not in request.json) or ('developer' not in request.json):
        return jsonify({'message': 'Missing required parameters'}), 400
    
    user_id = request.json['user_id']
    is_developer = request.json['developer']

    # ensure parameters are integers
    if type(user_id) is not int or type(is_developer) is not bool:
        return jsonify({'message': 'Invalid parameter data'}), 400
    
    # insert staff member into database
    # insert MySQL query here, return test data for the moment
    response = {"staff_id": 456, "developer": is_developer}

    return jsonify(response), 200


# POST block a user
@app.route('/api/users/block', methods=['POST'])
@token_required
def post_block_user(session_data):
    # ensure user is authorized to access the information
    if not session_data['is_staff']:
        return jsonify({'message': 'You do not have permission to access this information'}), 403
    
    # ensure needed parameters are present
    if (request.json is None) or ('user_id' not in request.json) or ('blocked' not in request.json):
        return jsonify({'message': 'Missing required parameters'}), 400
    
    user_id = request.json['user_id']
    blocked = request.json['blocked']

    # ensure parameters are integers
    if type(user_id) is not int or type(blocked) is not bool:
        return jsonify({'message': 'Invalid parameter data'}), 400
    
    # ensure user exists
    # insert MySQL query here, return test data for the moment
    exists = True

    if not exists:
        return jsonify({'message': 'User not found'}), 404
    
    # block user
    # insert MySQL query here, return test data for the moment
    response = {"msg": "User blocked" if blocked else "User unblocked"}

    return jsonify(response), 200


# POST approve a botnet order
@app.route('/api/botnet-orders/approve', methods=['POST'])
@token_required
def post_approve_botnet_order(session_data):
    # ensure user is authorized to access the information
    if not session_data['is_staff']:
        return jsonify({'message': 'You do not have permission to access this information'}), 403
    
    # ensure needed parameters are present
    if (request.json is None) or ('order_id' not in request.json) or ('approved' not in request.json):
        return jsonify({'message': 'Missing required parameters'}), 400
    
    order_id = request.json['order_id']
    approved = request.json['approved']

    # ensure parameters are integers
    if type(order_id) is not int or type(approved) is not bool:
        return jsonify({'message': 'Invalid parameter data'}), 400
    
    # ensure order exists
    # insert MySQL query here, return test data for the moment
    exists = True

    if not exists:
        return jsonify({'message': 'Order not found'}), 404
    
    # approve order
    # insert MySQL query here, return test data for the moment
    response = {"msg": "Order approved" if approved else "Order rejected"}

    return jsonify(response), 200