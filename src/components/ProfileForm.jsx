import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import './ProfileForm.css';

function ProfileForm() {

    const id = '14';
    const Url = 'http://me-fit-app.herokuapp.com/api/v1/profiles/';
    const userUrl = 'http://me-fit-app.herokuapp.com/api/v1/users/';


    const [preloadedProfileValues, setPreloadedProfileValues] = useState({});
    const [preloadedUserValues, setPreloadedUserValues] = useState({});
    const [buttonText, setButtonText] = useState("register");
    const [profileId, setProfileId] = useState();


    useEffect(() => {
        getUserData(id).then(data => setPreloadedUserValues(data))
        //setProfileId(String((preloadedUserValues.profile).slice(17, 20)))


        if (profileId) {
            getProfileData(profileId).then(data => setPreloadedProfileValues(data))
            setButtonText("Update");
        }

    }, [profileId]);


    const { register, handleSubmit } = useForm({
        //defaultValues: valuesFromServer
    });

    function processData(params) {
        params.preventDefault()
        console.log("lähettäää");
        if (id) {
            postProfileData(params);
            // postUserData(params);
            setButtonText("Update");
        }

        else {
            patchProfileData(params);
            //  patchUserData(params);
            setButtonText("Update");
        }
    }

    async function getProfileData(id) {
        try {
            let response = await fetch(Url + id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log("error is: " + error);
        }
    }

    async function getUserData(id) {
        try {
            let response = await fetch(userUrl + id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.log("error is: " + error);
        }
    }

    async function postProfileData(params) {
        try {
            let response = await fetch(Url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "first_name": params.first_name,
                    "last_name": params.last_name,
                    "weight": params.weight,
                    "height": params.height,
                    "medical_conditions": params.medical_conditions,
                    "disabilities": params.disabilities,
                    "image_link": params.image_link,
                    "app_user": { "id": id }
                })
            });
            let responseJson = await response.json();
            console.log(response);
            return responseJson.result;
        } catch (error) {
            console.log("error is: " + error);
        }
    }

    async function patchProfileData(params) {
        try {
            let response = await fetch(Url + id, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
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
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            ref={register}
                            defaultValue={preloadedUserValues.email}
                            type="text"
                            name="email"
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            ref={register}
                            defaultValue={preloadedUserValues.password}
                            type="text"
                            name="password"
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            ref={register}
                            defaultValue={preloadedProfileValues.first_name}
                            type="text"
                            name="first_name"
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formLastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            ref={register}
                            defaultValue={preloadedProfileValues.last_name}
                            type="text"
                            name="last_name"
                        />
                    </Form.Group>
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
                    <br />
                    <Form.Group controlId="formBasicChecbox">
                        <Form.Check name="checkBox" type="checkbox" label="I want to be a contributor" value="false" defaultChecked={preloadedUserValues.is_contributor} />
                    </Form.Group>
                    <Button variant="primary" size="lg" type="submit" >{buttonText}</Button>
                </Form>
            </div>
        </div>
    );
};

export default ProfileForm;