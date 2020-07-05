import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
    return axios.get(baseUrl)
}

const addPerson = newPerson => {
    return axios.post(baseUrl, newPerson)
}

const update = (id, newPerson) => {
    return axios.put(`${baseUrl}/${id}`, newPerson)
}
        
const deletePerson = (id) => {
    console.log(`${id} to be deleted`)
    axios.delete(`${baseUrl}/${id}`)
    return axios.get(baseUrl)
}

export default {getAllPersons, addPerson, update, deletePerson}
        