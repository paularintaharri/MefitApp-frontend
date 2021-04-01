import axios from 'axios'
import {
    getUserStorage
} from '../utils/userStorage';

const apiUrl = 'https://me-fit-app.herokuapp.com/api/v1/sets';
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

export const createSet = async (form) => {
    return await axios.post(apiUrl, form, config)
        .then((results) => {
            if (results.status === 201) {
                console.log("Set has been succesfully created")
            } else {
                console.log("Something went wrong, try again");
            }
            return results.data.id;
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