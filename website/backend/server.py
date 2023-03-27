# imports
from flask import Flask, jsonify, request
import jwt, secrets
from flask_mysqldb import MySQL # sudo apt install default-libmysqlclient-dev


# initialize flask
app = Flask(__name__)
PORT = 8080

# set up MySQL integration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'JaromIsTheGoatt'
app.config['MYSQL_DB'] = 'class'
#mysql = MySQL(app)

# set up JWT integration
app.config['SECRET_KEY'] = secrets.token_hex(32) # randomly-generated


# JWT verification function
def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = request.cookies.get('token')

        # ensure token is present
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        # ensure token is valid
        try:
            session_data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({'message': 'Token is invalid'}), 401
        
        return f(session_data, *args, **kwargs)


### REGISTER/LOGIN FUNCTIONALITY ###
import login_routes

### ACCOUNT FUNCTIONALITY ###
import account_routes

### STAFF FUNCTIONALITY ###
import staff_routes

### TICKET FUNCTIONALITY ###
import ticket_routes

### BOTNET ORDER FUNCTIONALITY ###
import botnet_order_routes


# run the app
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=PORT, threaded=True, debug=False)