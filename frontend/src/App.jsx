import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [contacts, setContacts] = useState([])

  useEffect (() => {
    fetchConatacts()
  }, [])


  const fetchConatacts = async () => {
     const response = await fetch("http://127.1.0.0:5000/contacts")
     const data = await response.json()
     setContacts(data.contacts)
     console.log(data.contacts)
  }


  return (
    <>
      
    </>
  )
}

export default App
