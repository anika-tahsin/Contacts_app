import { useState, useEffect } from 'react';
import ContactList  from './ContactList';
import './App.css';
import ContactForm from './ContactForm';

function App() {
  const [contacts, setContacts] = useState([])

  useEffect (() => {
    fetchConatacts()
  }, []);


  const fetchConatacts = async () => {
     const response = await fetch("http://127.1.0.0:5000/contacts");
     const data = await response.json();
     setContacts(data.contacts);
     console.log(data.contacts);
  }


  return <>< ContactList contacts={contacts} />
  <ContactForm /></>
}

export default App
