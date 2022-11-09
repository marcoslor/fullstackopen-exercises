import { useEffect, useState } from "react";
import PersonRecord from "./Components/PersonRecord";
import Search from "./Components/Search";
import PhonebookForm from "./Components/PhonebookForm";
import personsService from "./services/persons";
import "./App.css";

const uniqueId = (length = 16) =>
  parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace(".", "")
  );

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchResults, setSearchResults] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    personsService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const createMessage = (message, type) => {
    setMessage({ message, type });
    setTimeout(() => {
      setMessage(undefined);
    }, 5000);
  };

  const createSuccessMessage = (message) => {
    createMessage(message, "success");
  };

  const createErrorMessage = (message) => {
    createMessage(message, "error");
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: event.target.name.value,
      number: event.target.number.value,
      id: uniqueId(),
    };

    const personExists = persons.find(
      (person) => person.name === newPerson.name
    );

    if (personExists) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .update(personExists.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personExists.id ? person : updatedPerson
              )
            );
            createSuccessMessage(`Updated ${newPerson.name}`);
          });
      }
      return;
    }

    document.querySelector("#phonebook-form").reset();

    personsService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      createSuccessMessage(`Added ${newPerson.name}`);
    });
  };

  const handleSearchInput = (event) => {
    const searchInput = event.target.value;
    if (searchInput === "") {
      setSearchResults(undefined);
      return;
    }
    const searchResults = persons.filter((person) =>
      person.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(searchResults);
  };

  const deletePerson = (id) => () => {
    const person = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          createSuccessMessage(`Deleted ${person.name}`);
        })
        .catch(() => {
          createErrorMessage(
            `Information of ${person.name} had already been removed from server`
          );
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  return (
    <div>
      {message && (
        <p className={`message ${message.type}`}>{message.message}</p>
      )}
      <h2>Phonebook</h2>
      <div>
        <Search handleSearch={handleSearchInput} />
      </div>
      <PhonebookForm handleOnSubmit={handleOnSubmit} />
      <h2>Numbers</h2>
      <ul>
        {(searchResults || persons).map((person) => (
          <PersonRecord
            key={person.id}
            person={person}
            deletePerson={deletePerson(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
