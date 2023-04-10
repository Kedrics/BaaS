# imports
from __main__ import app, token_required, mysql
from flask import jsonify, request


# GET staff information
@app.route('/api/support-staff/<int:staff_id>', methods=['GET'])
@token_required
def get_staff(session_data, staff_id):
    # ensure user is authorized to access the information
    if not session_data['is_staff']:
        return jsonify({'message': 'You do not have permission to access this information'}), 403
    
    # get staff information
    cur = mysql.connection.cursor()
    cur.execute("SELECT staff_id, user_id, developer FROM Support_Staff WHERE staff_id=%s", (staff_id,))
    data = cur.fetchone()
    cur.close()

    if not data:
        return jsonify({'message': 'Staff member not found'}), 404
    
    response = {"staff_id": data[0], "user_id": data[2], "is_developer": data[1]==1}
    
    return jsonify(response), 200


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
    
    # ensure user_id is valid
    cur = mysql.connection.cursor()
    cur.execute("SELECT user_id FROM User WHERE user_id=%s", (user_id,))
    data = cur.fetchone()

    if not data:
        return jsonify({'message': 'User not found'}), 404
    
    # insert staff member into database
    cur.execute("INSERT INTO Support_Staff (developer, user_id) VALUES (%s, %s)", (is_developer,user_id))
    mysql.connection.commit()
    staff_id = cur.lastrowid
    cur.close()

    # return staff info
    response = {"staff_id": staff_id, "developer": is_developer}

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
    cur = mysql.connection.cursor()
    cur.execute("SELECT user_id FROM User WHERE user_id=%s", (user_id,))
    users_found = cur.rowcount
    cur.close()
    exists = (users_found > 0)

    if not exists:
        return jsonify({'message': 'User not found'}), 404
    
    # block user
    cur = mysql.connection.cursor()
    cur.execute("UPDATE User SET blocked=%s WHERE user_id=%s", (blocked, user_id))
    mysql.connection.commit()
    cur.close()

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
    cur = mysql.connection.cursor()
    cur.execute("SELECT order_id FROM User WHERE order_id=%s", (order_id,))
    orders_found = cur.rowcount
    cur.close()
    exists = (orders_found > 0)

    if not exists:
        return jsonify({'message': 'Order not found'}), 404
    
    # approve order
    cur = mysql.connection.cursor()
    cur.execute("UPDATE Botnet_Order SET approved=%s WHERE order_id=%s", (approved, order_id))
    mysql.connection.commit()
    cur.close()
    
    response = {"msg": "Order approved" if approved else "Order rejected"}

    return jsonify(response), 200