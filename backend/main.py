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
    try:
        db.session.add(new_contact)
        db.session.commit()

    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "User Created Successfully"}), 201

# update : any
    # Request: PUT, PATCH
 
app.route("/update_contact/<int:user_id>", methods= ["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)
    
    if not contact:
        return jsonify({"message": "User not found"}), 404
    
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)
    contact.phone = data.get("phone", contact.phone)


    db.session.commit()
    
    return jsonify ({"message": "User updated"}), 200


# delete: first_name, last_name, email, phone
    # Request: DELETE
app.route("/delete_contact/<int:user_id>", methods= ["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)
    
    if not contact:
        return jsonify({"message": "User not found"}), 404
     
     
    db.session.add(contact)
    db.session.commit()
    
    return jsonify({"message": "User deleted"}), 200 

if __name__ == "__main__":
    with app.app_context():
        db.create_all() 
        
    app.run(debug=True)