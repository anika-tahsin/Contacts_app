import { useState } from "react";
import PropTypes from 'prop-types';

const ContactForm = ({existingContact = {}, updateCallback}) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");
    const [phone, setPhone] = useState(existingContact.phone || "");


    const updating = Object.entries(existingContact).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            firstName,
            lastName,
            email,
            phone,
        }

        
       {/* 
       const link = await fetch("http://127.0.0.1:5000/create_contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    
      if (response.ok) {
        console.log("Contact created successfully");
      } else {
        console.error("Failed to create contact");
      }
    */}

        const url = "http://127.0.0.1:5000/" +(updating ? 'update_contact/${existingContact.id}' : "create_contact");
        const options = {
            method: updating? "PATCH" : "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }

        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200){
            const data = await response.json()
            alert (data.message)
            
        } else {
            updateCallback()
        }

    }


    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="firstName"> First Name: </label>
                <input 
                    type="text" 
                    id ="firstName" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value )}
                />
            </div>
            <div>
                <label htmlFor="lastName"> Last Name: </label>
                <input 
                    type="text" 
                    id ="lastName" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value )}
                />
            </div>

            <div>
                <label htmlFor="email"> Email: </label>
                <input 
                    type="email" 
                    id ="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value )}
                />
            </div>
            <div>
                <label htmlFor="phone"> Phone: </label>
                <input 
                    type="tel" 
                    id ="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value )}
                />
            </div>
            <button type="submit"> {updating ? "Update" : "Create"} </button>
    </form>
   
    );

};

ContactForm.propTypes = {
    existingContact: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    updateCallback: PropTypes.func.isRequired,
};

export default ContactForm