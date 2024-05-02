from flask import request, jsonify
from config import app, db
from models import Contact


# create: first_name, last_name, email, phone
  # localhost:5000/create_contact
     # Request: type: GET, POST; json{}
     # Response: status: 200(success), 404(Not found) etc...; json{}
@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts":json_contacts})

# read/get: first_name, last_name, email, phone
  # Request: 
@app.route("/create_contacts", methods=["POST"])
def create_contacts():
    first_name = request.json.get("firstname")
    last_name = request.json.get("lastname")
    email = request.json.get("email")
    phone = request.json.get("phone")

    if not first_name or not last_name or not email or not phone:
        return (
            jsonify({"message": "You must include first name, last name, email and phone number"}), 
        400,
        )
    
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email, phone=phone)
           
    
    

# update : any
    # Request: PUT, PATCH

# delete: first_name, last_name, email, phone
    # Request: DELETE



if __name__ == "__main__":
    with app.app_context():
        db.create_all() 
        
    app.run(debug=True)