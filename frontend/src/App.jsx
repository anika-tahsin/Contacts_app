import { useState, useEffect } from "react";
import ContactList  from "./ContactList";
import './App.css';
import ContactForm from "./ContactForm";

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})
  

  useEffect (() => {
    fetchConatacts()
  }, []);


  const fetchConatacts = async () => {
     const response = await fetch("http://localhost:5000/contacts");
     const data = await response.json();
     setContacts(data.contacts);
  };


  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)

  }

  const onUpdate = () => {
    closeModal()
    fetchConatacts()
  }

  return (
    <>
    <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
    <button onClick={openCreateModal}> Create New Contact </button>
    {
      isModalOpen && <div className="modal">
        <div className='modal-content'>
         <span className='close' onClick={closeModal}>&times;</span>
         <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
        </div>
      </div>
    }
    
    </>
  );
}

export default App;
