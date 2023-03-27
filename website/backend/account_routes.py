# imports
from __main__ import app, token_required
from flask import jsonify, request


# GET user information
@app.route('/api/users/<int:user_id>', methods=['GET'])
@token_required
def main(session_data, user_id):
    # ensure user is authorized to access the information
    if (not session_data['is_staff']) and (session_data['user_id'] != user_id):
        return jsonify({'message': 'You do not have permission to access this information'}), 403
    
    # get user information
    # insert MySQL query here, return test data for the moment
    user_data = {"user_id": 123, "email": "johndoe@example.com", "username": "johndoe", "blocked": False, "bitcoin_wallet": "0x1234567890abcdef"}

    return jsonify(user_data), 200



# GET affiliate information
# POST add a bot as an affiliate
# POST send a command to a botnet