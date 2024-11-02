import axios from 'axios'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries'

export const fetchCountryByName = (name) => {
    const response = axios.get(`${baseURL}/api/name/${name}`)
    return response
}