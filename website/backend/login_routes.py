# imports
from __main__ import app, mysql
from flask import jsonify, request, make_response
import re, jwt
from hashlib import sha256

# POST register
@app.route('/api/register', methods=['POST'])
def post_register():
    # ensure needed parameters are present
    if (request.json is None) or ('email' not in request.json) or ('username' not in request.json) or ('password' not in request.json) or ('bitcoin_wallet' not in request.json):
        return jsonify({'message': 'Missing required parameters'}), 400
    
    email = request.json['email']
    username = request.json['username']
    password = request.json['password']
    bitcoin_wallet = request.json['bitcoin_wallet']

    # ensure parameters are strings
    if type(email) is not str or type(username) is not str or type(password) is not str or type(bitcoin_wallet) is not str:
        return jsonify({'message': 'Invalid parameter data'}), 400
    
    # ensure email is valid
    if not re.fullmatch(r'\b[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b', email):
        return jsonify({'message': 'Invalid email'}), 400
    
    # ensure username is valid
    if len(username) < 4 or len(username) > 255:
        return jsonify({'message': 'Invalid username length'}), 400
    
    # ensure username isn't already taken
    cur = mysql.get_db().cursor()
    cur.execute("SELECT username FROM User WHERE username=%s", (username))
    users_found = cur.rowcount
    cur.close()
    username_taken = (users_found > 0)

    if username_taken:
        return jsonify({'message': 'Username already taken'}), 500
    
    # ensure password is valid
    if len(password) < 12 or len(password) > 255:
        return jsonify({'message': 'Password doesn\'t fit length requirements'}), 400
    
    # ensure bitcoin wallet is valid
    if not re.fullmatch(r'0x[0-9a-fA-F]+', bitcoin_wallet):
        return jsonify({'message': 'Invalid bitcoin wallet'}), 400

    # insert user into database
    cur = mysql.get_db().cursor()
    cur.execute("INSERT INTO User (email, username, password, blocked, bitcoin_wallet) VALUES (%s, %s, %s, %s, %s)", (email, username, sha256(password.encode()).hexdigest(), 0, bitcoin_wallet))
    mysql.connection.commit()
    user_id = cur.lastrowid
    cur.close()
    # use sha256(password.encode()).hexdigest() as password_hash
    response = {"user_id": user_id}
    return jsonify(response), 200


# POST login
@app.route('/api/login', methods=['POST'])
def post_login():
    # ensure needed parameters are present
    if (request.json is None) or ('username' not in request.json) or ('password' not in request.json):
        return jsonify({'message': 'Missing required parameters'}), 400
    
    username = request.json['username']
    password = request.json['password']

    # ensure parameters are strings
    if type(username) is not str or type(password) is not str:
        return jsonify({'message': 'Invalid parameter data'}), 400
    
    # ensure username is valid
    if len(username) < 4 or len(username) > 255:
        return jsonify({'message': 'Invalid username length'}), 400
    
    # ensure password is valid
    if len(password) < 12 or len(password) > 255:
        return jsonify({'message': 'Password doesn\'t fit length requirements'}), 400
    
    # check if username exists
    cur = mysql.get_db().cursor()
    cur.execute("SELECT * FROM User WHERE username=%s", (username))
    users_found = cur.rowcount
    response = cur.fetchone()
    cur.close()
    # insert MySQL query here, return test data for the moment
    exists = (users_found > 0)
    user_id = response["user_id"]
    cur = mysql.get_db().cursor()
    cur.execute("SELECT * FROM support_staff WHERE user_id=%s", (user_id))
    staff_found = cur.rowcount
    cur.close()
    is_staff = (staff_found > 0)

    if not exists:
        return jsonify({'message': 'Invalid username or password'}), 401
    
    # check if password is correct
    # insert MySQL query here, return test data for the moment
   
    # hash = 'a2c96d518f1099a3b6afe29e443340f9f5fdf1289853fc034908444f2bcb8982' # hash of 'testtesttest'
    hash =  response["password"]
    if sha256(password.encode()).hexdigest() != hash:
        return jsonify({'message': 'Invalid username or password'}), 401
    
    # generate JWT
    token = jwt.encode({'user_id': user_id, "is_staff": is_staff}, app.config['SECRET_KEY'], algorithm='HS256')

    resp = make_response(jsonify({'message': 'Successfully logged in'}), 200)
    resp.set_cookie('token', token, httponly=True, samesite='Strict', max_age=None)

    return resp