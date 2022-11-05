import { useState } from 'react'
import PersonRecord from './Components/PersonRecord'
import Search from './Components/Search'
import PhonebookForm from './Components/PhonebookForm'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [searchResults, setSearchResults] = useState()

    const handleOnSubmit = (event) => {
        event.preventDefault()

        const newPerson = {
            name: event.target.name.value,
            number: event.target.number.value,
            id: persons.length + 1
        }

        if (persons.some((person) => newPerson.name === person.name)) {
            alert(`${newPerson.name} is already added to phonebook`)
            return
        }

        setPersons(persons.concat(newPerson))
        document.querySelector('#phonebook-form').reset()
    }

    const handleSearchInput = (event) => {
        const searchInput = event.target.value
        if (searchInput === '') {
            setSearchResults(undefined)
            return
        }
        const searchResults = persons.filter((person) => person.name.toLowerCase().includes(searchInput.toLowerCase()))
        setSearchResults(searchResults)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                <Search handleSearch={handleSearchInput} />
            </div>
            <PhonebookForm handleOnSubmit={handleOnSubmit} />
            <h2>Numbers</h2>
            <ul>
                {(searchResults || persons).map(person => <PersonRecord key={person.id} person={person} />)}
            </ul>
        </div>
    )
}

export default App