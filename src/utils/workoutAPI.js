import axios from 'axios'
import { getUserStorage } from '../utils/userStorage';

const apiUrl = 'https://me-fit-app.herokuapp.com/api/v1/workouts';
const { token } = getUserStorage('ra_session')

let config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
  }

export const getAllWorkouts = async () => {
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

export const createWorkout = async (form) => {
    return await axios.post(apiUrl, form, config)
        .then((results) => {
            if (results.status === 201) {
                console.log("Workout has been succesfully created")
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

export const updateWorkout = async (form) => {
    return await axios.patch(apiUrl + "/" + form.id, form, config)
        .then((results) => {
            if (results.status === 200) {
                console.log("Workout has been succesfully updated")
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

export const getSetsForWorkout = async (workout) => {
    return await axios.get(apiUrl + "/" + workout.id + "/sets", config)
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