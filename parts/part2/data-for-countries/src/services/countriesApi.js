import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'
const getByNameUrl = '/name'

const getAllCountries = async () => axios.get(`${baseURL}/all`).then(response => response.data);

const getOneCountryByName = async (name) => axios.get(`${baseURL}${getByNameUrl}/${name}`).then(response => response.data);


export default { getAllCountries, getOneCountryByName };