import { useState, useEffect } from 'react';
import CountriesForm from './components/CountriesForm';
import countriesApi from './services/countriesApi';
import Country from './components/Country';
import UniqueCountry from './components/UniqueCountry';

function App() {
    const [countries, setCountries] = useState([]);
    const [searchCountry, setSearchCountry] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        countriesApi.getAllCountries().then((countries) => {
            setCountries(countries);
            setLoading(false);
        });
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

    const handleShowCountry = (name) => {
        setLoading(true);
        countriesApi.getOneCountryByName(name).then((country) => {
            setFilteredCountries([country]);
            setLoading(false);
        });
    };

    return (
        <>
            {countries.length !== 0 && !loading && (
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
                                    onClick={handleShowCountry}
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
            )}
            {loading && <>Loading...</>}
        </>
    );
}

export default App;
