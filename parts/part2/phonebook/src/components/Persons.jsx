const Persons = ({ contactsToShow, deleteContact }) => {
    return (
        <>
            {contactsToShow.map((person) => (
                <p key={person.name}>
                    {person.name} {person.number}
                    <button onClick={() => deleteContact(person.id)}>Delete</button>
                </p>
            ))}
        </>
    );
};

export default Persons;
