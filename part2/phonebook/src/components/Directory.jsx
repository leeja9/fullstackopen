import phonebookService from "../services/phonebookService"

const Directory = ({ persons, setPersons, filter }) => {
    const deleteHandler = (name, id) => (event) => {
        event.preventDefault()
        const confirmed = window.confirm("Delete " + name + " from phonebook?")
        if (confirmed) {
            phonebookService
            .deleteEntry(id)
            .then(status => {
                status === 200
                ? setPersons(persons.filter(person => person.id !== id))
                : alert("Couldn't delete " + name)
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {persons
                .filter((person) => filter === '' ? true : person.name.toLowerCase().includes(filter.toLowerCase()))
                .map((person) => {
                    return (
                        <tr key={person.name}>
                            <td>{person.name}</td>
                            <td>{person.number}</td>
                            <td><button onClick={deleteHandler(person.name, person.id)}>Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Directory
