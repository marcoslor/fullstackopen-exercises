import { useEffect, useState } from 'react'
import PersonRecord from './Components/PersonRecord'
import Search from './Components/Search'
import PhonebookForm from './Components/PhonebookForm'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [searchResults, setSearchResults] = useState()

    useEffect(() => { 
        axios.get('http://localhost:3001/persons').then(response => {
            setPersons(response.data)
        })
    }, [])

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