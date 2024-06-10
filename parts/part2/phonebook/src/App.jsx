import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from './components/Filter';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(promise => setPersons(promise.data));
    }, [])

    const handleChangeName = (event) => setNewName(event.target.value);
    const handleChangeNumber = (event) => setNewNumber(event.target.value);
    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const isInPhoneBook = persons.find((person) => person.name === newName);

        if (isInPhoneBook) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        const newArr = [...persons, { name: newName, number: newNumber }];

        setNewName("");
        setNewNumber("");
        setPersons(newArr);
    };

    const contactsToShow = persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleChangeFilter={handleChangeFilter} />
            <h3>add a new</h3>
            <PersonForm
                handleSubmit={handleSubmit}
                newName={newName}
                handleChangeName={handleChangeName}
                newNumber={newNumber}
                handleChangeNumber={handleChangeNumber}
            />
            <h3>Numbers</h3>
            <Persons contactsToShow={contactsToShow}/>
        </div>
    );
};

export default App;
