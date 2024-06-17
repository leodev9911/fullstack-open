import { useEffect, useState } from 'react';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import phonebook from './services/phonebook';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        phonebook.getAll().then((phonebookData) => setPersons(phonebookData));
    }, []);

    const handleChangeName = (event) => setNewName(event.target.value);
    const handleChangeNumber = (event) => setNewNumber(event.target.value);
    const handleChangeFilter = (event) => {
        setFilter(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const isInPhoneBook = persons.find((person) => person.name === newName);

        if (isInPhoneBook) {
            const personInPhoneBook = persons.filter(
                (person) => person.name === newName
            )[0];
            if (
                window.confirm(
                    `${newName} is already added to phonebook, replace the old number with a new one?`
                )
            ) {
                handleEditContact(personInPhoneBook.id, {
                    ...personInPhoneBook,
                    number: newNumber,
                });
            }
            return;
        }

        phonebook
            .createNewContact({ name: newName, number: newNumber })
            .then((newPerson) => {
                const newArr = [...persons, newPerson];

                setNewName('');
                setNewNumber('');
                setPersons(newArr);
            });
    };

    const handleDeleteContact = (id) => {
        window.confirm('Are you sure you want to delete this contact?') &&
            phonebook.deleteContact(id).then((deletedPerson) => {
                const newArr = persons.filter(
                    (person) => person.id !== deletedPerson.id
                );
                setPersons(newArr);
            });
    };

    const handleEditContact = (id, newPhone) => {
        phonebook.editPhoneContact(id, newPhone).then((editedPerson) => {
            setNewName('');
            setNewNumber('');
            setPersons(
                persons.map((person) =>
                    person.id !== id ? person : editedPerson
                )
            );
        });
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
            <Persons
                contactsToShow={contactsToShow}
                deleteContact={handleDeleteContact}
            />
        </div>
    );
};

export default App;
