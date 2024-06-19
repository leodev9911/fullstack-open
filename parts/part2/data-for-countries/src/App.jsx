import { useState, useEffect } from 'react';
import CountriesForm from './components/CountriesForm';
import countriesApi from './services/countriesApi';
import Country from './components/Country';
import UniqueCountry from './components/UniqueCountry';

function App() {
    const [countries, setCountries] = useState([]);
    const [searchCountry, setSearchCountry] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);

    useEffect(() => {
        countriesApi
            .getAllCountries()
            .then((countries) => setCountries(countries));
    }, []);

    const handleChange = (event) => {
        setSearchCountry(event.target.value);
        setFilteredCountries(
            countries.filter((country) =>
                country.name.common
                    .toLowerCase()
                    .includes(searchCountry.toLowerCase())
            )
        );
    };

    return (
        <>
            {countries.length !== 0 ? (
                <>
                    <CountriesForm
                        searchCountry={searchCountry}
                        handleChange={handleChange}
                    />
                    <div>
                        {filteredCountries &&
                            filteredCountries.length > 1 &&
                            filteredCountries.length < 10 &&
                            filteredCountries.map((country) => (
                                <Country
                                    key={country.name.common}
                                    country={country.name.common}
                                />
                            ))}
                        {filteredCountries &&
                            filteredCountries.length > 1 &&
                            filteredCountries.length > 10 && (
                                <p>Too many matches, specify another filter</p>
                            )}
                        {filteredCountries &&
                            filteredCountries.length === 1 && (
                                <UniqueCountry country={filteredCountries[0]} />
                            )}
                    </div>
                </>
            ) : (
                <>Loading...</>
            )}
        </>
    );
}

export default App;
