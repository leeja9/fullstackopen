import { useState, useEffect } from 'react'
import Directory from './components/Directory'
import UserInputForm from './components/UserInputForm'
import Filter from './components/Filter'
import phonebookService from './services/phonebookService'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [filter, setFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState({error: null, success: null})
  useEffect(() => {
      phonebookService.getAll()
          .then(updatedPersons => setPersons(updatedPersons))
          .catch(err => console.log(err))
  }, [])
  return (
      <div>
          <h2>Phonebook</h2>
          <Filter filter={filter} setFilter={setFilter} />
          <h2>Add New</h2>
          <Notification message={message} />
          <UserInputForm persons={persons} setPersons={setPersons} message={message} setMessage={setMessage} />
          <h2>Numbers</h2>
          <Directory persons={persons} setPersons={setPersons} filter={filter} />
      </div>
  )
}

export default App