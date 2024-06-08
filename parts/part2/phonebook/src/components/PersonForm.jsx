const PersonForm = ({ handleSubmit, newName, handleChangeName, newNumber, handleChangeNumber }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name:
                <input
                    type="text"
                    value={newName}
                    onChange={handleChangeName}
                />
            </div>
            <div>
                number:
                <input
                    type="text"
                    value={newNumber}
                    onChange={handleChangeNumber}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default PersonForm;
