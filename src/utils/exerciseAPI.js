import axios from 'axios'
import {
    getUserStorage
} from '../utils/userStorage';

const apiUrl = 'https://me-fit-app.herokuapp.com/api/v1/exercises';
const apiUrlGetExercise = 'https://me-fit-app.herokuapp.com';
const {
    token
} = getUserStorage('ra_session')

let config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

export const getAllExercises = async () => {
    return await axios.get(apiUrl, config)
        .then(response => response.data)
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        })
}

export const getExerciseById = async (id) => {
    return await axios.get(apiUrlGetExercise + id, config)
        .then(response => response.data)
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        })
}

export const createExercises = async (form) => {
    return await axios.post(apiUrl, form, config)
        .then((results) => {
            if (results.status === 201) {
                console.log("Exercise has been succesfully created")
            } else {
                console.log("Something went wrong, try again");
            }
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        })
}

export const updateExercises = async (form) => {
    return await axios.patch(apiUrl + "/" + form.id, form, config)
        .then((results) => {
            if (results.status === 204) {
                console.log("Exercise has been succesfully updated")
            } else {
                console.log("Something went wrong, try again");
            }
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        })
}