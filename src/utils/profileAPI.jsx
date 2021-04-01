import React, { useState } from "react";
import { setUserStorage, getUserStorage } from './userStorage';

const url = 'https://me-fit-app.herokuapp.com/api/v1/profiles/';



export async function getProfileData(token, tokenParsed) {

    let id;

    if (tokenParsed) {

        id = tokenParsed.sub;


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
}


export async function patchProfileData(params, token, tokenParsed) {
    const id = tokenParsed.sub;
    console.log("patchin sisällä params: " + JSON.stringify(params) + " id: " + id + " token: " + token)

    try {
        let response = await fetch(url + id, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                //"id": id,
                //"first_name": params.first_name,
                //"last_name": params.last_name,
                "weight": parseInt(params.weight),
                "height": parseInt(params.height),
                "medical_conditions": params.medical_conditions,
                "disabilities": params.disabilities,
                "image_link": params.image_link
            })
        });
        let responseJson = await response.json();
        console.log(response);
        return responseJson.result;
    } catch (error) {
        console.log("error is: " + error);
    }
}
