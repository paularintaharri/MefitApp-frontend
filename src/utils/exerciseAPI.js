import axios from 'axios'

const apiUrl = 'https://me-fit-app.herokuapp.com/api/v1/exercises';
const apiUrlGetExercise = 'https://me-fit-app.herokuapp.com';

export const getAllExercises = async () => {
    return await axios.get(apiUrl)
        .then(response => response.data)
        .catch((error) => {
            console.log(error);
        })
}

export const getExerciseById = async (id) => {
    return await axios.get(apiUrlGetExercise + id)
        .then(response => response.data)
        .catch((error) => {
            console.log(error);
        })
}

export const createExercises = async (form) => {
    return await axios.post(apiUrl, form)
        .then((results) => {
            if (results.status === 201) {
                console.log("Exercise has been succesfully created")
            } else {
                console.log("Something went wrong, try again");
            }
        })
        .catch((error) => {
            console.log(error);
        })
}

export const updateExercises = async (form) => {
    return await axios.patch(apiUrl + "/" + form.id, form)
        .then((results) => {
            if (results.status === 204) {
                console.log("Exercise has been succesfully updated")
            } else {
                console.log("Something went wrong, try again");
            }
        })
        .catch((error) => {
            console.log(error);
        })
}
