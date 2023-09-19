import { useState } from 'react'
import phonebookService from '../services/phonebookService'

const UserInputForm = ({ persons, setPersons, message, setMessage }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const changeNameHandler = (event) => {
        setNewName(event.target.value)
    }

    const changeNumberHandler = (event) => {
        // TODO regex filter for phone number validation
        setNewNumber(event.target.value)
    }

    const setNotification = (msg, type, seconds) => {
        const newMessage = {...message}
        newMessage[type] = msg
        setMessage(newMessage)
        setTimeout(() => {
            setMessage({error: null, success: null})
        }, seconds * 1000)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        let newPersons = [...persons]
        if (newName === '' || newNumber === '') {
            alert('fields cannot be blank')
        } else if (newPersons.some((person) => person.name === newName)) {
            phonebookService.getAll().then(returnedData => {
                if (!returnedData.some(person => person.name === newName)) {
                    setNotification(`${newName} already deleted from phone book`, 'error', 5)
                    setPersons(returnedData)
                    setNewName('')
                    setNewNumber('')
                } else {
                    const confirmed = window.confirm(`Update phone number for ${newName}?`)
                    if (confirmed) {
                        const person = newPersons.find(person => person.name === newName)
                        person.number = newNumber
                        phonebookService
                        .update(person.id, person)
                        .then(responseData => {
                            newPersons = newPersons.filter(p => p.id !== person.id)
                            newPersons.push(responseData)
                            setPersons(newPersons)
                            const msg = `Successfully updated ${person.name}'s phone number to ${person.number}`
                            setNotification(msg, 'success', 5)
                            setNewName('')
                            setNewNumber('')
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    }
                }
            })
        } else if (newPersons.some((person) => person.number === newNumber)) {
            alert(`${newNumber} is already added to phonebook`)
        } else {
            phonebookService.create({ name: newName, number: newNumber })
                .then(returnedData => {
                    console.log('Returned Data: ' + JSON.stringify(returnedData))
                    newPersons.push(returnedData)
                    const msg = `Successfully added ${returnedData.name}`
                    setNotification(msg, 'success', 5)
                    setPersons(newPersons)
                    setNewName('')
                    setNewNumber('')
                })
                .catch(err => alert(`Error creating entry: ${err}`))
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                Name: <input value={newName} onChange={changeNameHandler} />
            </div>
            <div>
                Phone Number: <input value={newNumber} onChange={changeNumberHandler} />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    )
}

export default UserInputForm
