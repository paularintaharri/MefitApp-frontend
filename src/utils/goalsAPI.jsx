import React, { useState } from "react";
import { setUserStorage, getUserStorage } from './userStorage';

const url = 'https://me-fit-app.herokuapp.com/api/v1/profiles/';



export async function getProfileData(token, tokenParsed) {

    const id = tokenParsed.sub;



    try {
        let response = await fetch(url + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        let responseJson = await response.json();
        console.log("incoming profilevalues: " + JSON.stringify(responseJson));
        return (responseJson);
    } catch (error) {
        console.log("error is: " + error);
    }
}