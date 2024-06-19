import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAllCountries = async () => axios.get(`${baseURL}/all`).then(response => response.data);


export default { getAllCountries };