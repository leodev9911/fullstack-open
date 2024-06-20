const Country = ({ country, onClick }) => {
    return <div>
        <p>{country}</p>
        <button onClick={() => onClick(country)}>show</button>
    </div>
};

export default Country;
