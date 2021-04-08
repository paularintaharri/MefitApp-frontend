import React, { useState } from "react";
import { setUserStorage, getUserStorage } from './userStorage';
import axios from 'axios'



export async function getGoalData(token, tokenParsed) {


    let id = tokenParsed.sub;
    const url = `https://me-fit-app.herokuapp.com/api/v1/profiles/${id}/goals`;

    if (tokenParsed) {



        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            let responseJson = await response.json();
            console.log("incoming goals: " + JSON.stringify(responseJson));
            return responseJson;
        } catch (error) {
            console.log("error is: " + error);
        }
    }
}

/*
export async function setGoalData(token, tokenParsed) {

    let id;
    const url = `https://me-fit-app.herokuapp.com/api/v1/profiles/${id}/goals`;

    if (tokenParsed) {

        id = tokenParsed.sub;

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            let responseJson = await response.json();
            console.log("incoming goals: " + JSON.stringify(responseJson));
            return responseJson;
        } catch (error) {
            console.log("error is: " + error);
        }
    }
}
*/

export const createGoal = async (form, token) => {
    const apiUrl = 'https://me-fit-app.herokuapp.com/api/v1/goals';

    return await axios.post(apiUrl, form, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((results) => {
            if (results.status === 201) {
                console.log("Goal has been succesfully created")
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