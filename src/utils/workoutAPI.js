import axios from 'axios'

const apiUrl = 'https://me-fit-app.herokuapp.com/api/v1/workouts';

export const getAllWorkouts = async (token) => {
    return await axios.get(apiUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
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

export const createWorkout = async (form, token) => {
    return await axios.post(apiUrl, form, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then((results) => {
            if (results.status === 201) {
                console.log("Workout has been succesfully created")
            } else {
                console.log("Something went wrong, try again");
            }
            return results.data;
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

export const updateWorkout = async (form, token) => {
    return await axios.patch(apiUrl + "/" + form.id, form, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
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

export const getSetsForWorkout = async (workout, token) => {
    return await axios.get(apiUrl + "/" + workout.id + "/sets", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
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