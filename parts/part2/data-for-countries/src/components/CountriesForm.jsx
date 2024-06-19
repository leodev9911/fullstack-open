const CountriesForm = ({ searchCountry, handleChange }) => {
    return (
        <div>
            Find countries
            <input
                type="text"
                value={searchCountry}
                onChange={(event) => handleChange(event)}
            ></input>
        </div>
    );
};

export default CountriesForm;
