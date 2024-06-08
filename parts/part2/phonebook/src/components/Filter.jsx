const Filter = ({ filter, handleChangeFilter }) => {
    return (
        <div>
            <div>
                name:
                <input
                    type="text"
                    value={filter}
                    onChange={handleChangeFilter}
                />
            </div>
        </div>
    );
};

export default Filter;
