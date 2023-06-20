import axios from 'axios';

// const usersUrl = 'http://localhost:8000/data'
const usersUrl = '/data';

export const getUsers = async (id) => {
    console.log(id)
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);
}

export const addUser = async (user) => {
    return await axios.post(usersUrl, user);
}

export const editUser = async (id, user) => {
    return await axios.patch(`${usersUrl}/${id}`, user)
}

export const deleteUser = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`)
}