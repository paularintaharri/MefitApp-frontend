import React, { useState } from "react";
import { setUserStorage, getUserStorage } from './userStorage';




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