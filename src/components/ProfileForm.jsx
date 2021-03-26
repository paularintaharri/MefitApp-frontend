import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { setUserStorage, getUserStorage } from '../utils/userStorage';
import './ProfileForm.css';

function ProfileForm() {

    const url = 'https://me-fit-app.herokuapp.com/';

    const [preloadedProfileValues, setPreloadedProfileValues] = useState({});
    const [preloadedUserValues, setPreloadedUserValues] = useState({});
    const [buttonText, setButtonText] = useState("register");
    const [id, setId] = useState();
    // const [token, setToken] = useState({});
    // const [tokenParsed, setTokenParsed] = useState({});


    // useEffect(() => {
        const { token, tokenParsed } = getUserStorage('ra_session')
        // setToken(token);
        // setTokenParsed(tokenParsed);
                
    // }, [token, tokenParsed]);

    async function getProfileData(id) {
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
            console.log(responseJson)
            setPreloadedProfileValues(responseJson);
        } catch (error) {
            console.log("error is: " + error);
        }
    }


    const { register, handleSubmit } = useForm({
        //defaultValues: valuesFromServer
    });

    async function processData(params) {
        // params.preventDefault()
        console.log("lähettäää");
        // if (id) {
            postProfileData(params);
            // postUserData(params);
            // setButtonText("Update");
        // }

        // else {
        //     patchProfileData(params);
        //     //  patchUserData(params);
        //     setButtonText("Update");
        // }
    }
    

    async function postProfileData(params) {
        console.log(params)
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "id": tokenParsed.sub,
                    "weight": params.weight,
                    "height": params.height,
                    "medical_conditions": params.medical_conditions,
                    "disabilities": params.disabilities,
                    "image_link": params.image_link,
                })
            });
            let responseJson = await response.json();
            console.log(responseJson);
            return responseJson.result;
        } catch (error) {
            console.log("error is: " + error);
        }
    }

    async function patchProfileData(params) {
        try {
            let response = await fetch(url + id, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "id": id,
                    "first_name": params.first_name,
                    "last_name": params.last_name,
                    "weight": params.weight,
                    "height": params.height,
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

    return (
        <div>
            <div id="form">
                <Form onSubmit={handleSubmit(processData)}>
                    <br />
                    <Form.Group controlId="formHeight">
                        <Form.Label>Height</Form.Label>
                        <Form.Control
                            ref={register}
                            defaultValue={preloadedProfileValues.height}
                            type="text"
                            name="weight"
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formWeight">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                            ref={register}
                            defaultValue={preloadedProfileValues.weight}
                            type="text"
                            name="height"
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formMedicalConditions">
                        <Form.Label>MedicalConditions</Form.Label>
                        <Form.Control
                            ref={register}
                            placeholder={preloadedProfileValues.medical_conditions}
                            type="text"
                            name="medical_conditions"
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formDisabilities">
                        <Form.Label>Disabilities</Form.Label>
                        <Form.Control
                            ref={register}
                            placeholder={preloadedProfileValues.disabilities}
                            type="text"
                            name="disabilities"
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formImageLink">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            ref={register}
                            placeholder={preloadedProfileValues.image_link}
                            type="text"
                            name="image_link"
                        />
                    </Form.Group>
                    {/* <br />
                    <Form.Group controlId="formBasicChecbox">
                        <Form.Check name="checkBox" type="checkbox" label="I want to be a contributor" value="false" defaultChecked={preloadedUserValues.is_contributor} />
                    </Form.Group> */}
                    <Button variant="primary" size="lg" type="submit" >{buttonText}</Button>
                </Form>
            </div>
        </div>
    );
};

export default ProfileForm;