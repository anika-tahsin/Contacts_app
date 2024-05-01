from flask import request, jsonify
from config import app, db
from models import Contact



# create: first_name, last_name, email, phone
  # localhost:5000/create_contact
     # Request: type: GET, POST; json{}
     # Response: status: 200(success), 404(Not found) etc...; json{}

# read/get: first_name, last_name, email, phone
  # Request: 

# update : any
    # Request: PUT, PATCH

# delete: first_name, last_name, email, phone
    # Request: DELETE



if __name__ == "__main__":
    with app.app_context():
        db.create_all() 
        
    app.run(debug=True)