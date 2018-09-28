import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
}

const addPersonToServer = (newPerson) => {
    axios.post(baseUrl, newPerson)
}

export default { getPersons, addPersonToServer }
