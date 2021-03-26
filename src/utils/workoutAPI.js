import axios from 'axios'

const apiUrl = 'https://me-fit-app.herokuapp.com/api/v1/workouts';

export const getAllWorkouts = async () => {
    return await axios.get(apiUrl)
        .then(response => response.data)
        .catch((error) => {
            console.log(error);
        })
}

export const createWorkout = async (form) => {
    return await axios.post(apiUrl, form)
        .then((results) => {
            if (results.status === 201) {
                console.log("Workout has been succesfully created")
            } else {
                console.log("Something went wrong, try again");
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

export const updateWorkout = async (form) => {
    return await axios.patch(apiUrl + "/" + form.id, form)
        .then((results) => {
            if (results.status === 204) {
                console.log("Workout has been succesfully updated")
            } else {
                console.log("Something went wrong, try again");
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

export const getSetsForWorkout = async (workout) => {
    return await axios.get(apiUrl + "/" + workout.id + "/sets" )
        .then(response => response.data)
        .catch((error) => {
            console.log(error);
        })
}