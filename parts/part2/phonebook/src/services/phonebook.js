import axios from 'axios';

const baseUrl = 'http://localhost:3000/persons';

const getAll = async () => axios.get(baseUrl).then((promise) => promise.data);

const createNewContact = (newPerson) =>
    axios.post(baseUrl, newPerson).then((promise) => promise.data);

const deleteContact = async (id) => {
    const url = `${baseUrl}/${id}`;
    return axios.delete(url).then((response) => response.data);
};

const editPhoneContact = (id, newPhone) => {
    const url = `${baseUrl}/${id}`;
    return axios.put(url, newPhone).then((response) => response.data);
};

export default {
    getAll,
    createNewContact,
    deleteContact,
    editPhoneContact,
};
