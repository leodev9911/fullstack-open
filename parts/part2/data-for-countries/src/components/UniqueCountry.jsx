const UniqueCountry = ({ country }) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <div>
                <h3>languages</h3>
                <ul>
                    {Object.values(country.languages).map((language) => (
                        <li key={language}>{language}</li>
                    ))}
                </ul>
            </div>
            <img src={country.flags.png} alt={country.name.common} />
        </div>
    );
};

export default UniqueCountry;
