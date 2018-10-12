import axios from 'axios'
const baseUrl = '/api/persons'

const getPersons = () => {
    return axios.get(baseUrl)
        .then(response => response.data)
}

const addPersonToServer = (newPerson) => {
    return axios.post(baseUrl, newPerson)
        .then(response => response.data)
}

const deletePerson = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

const updatePhoneNumber = (person) => {
    return axios.put(`${baseUrl}/${person.id}`, person)
}

export default { getPersons, addPersonToServer, deletePerson, updatePhoneNumber }
