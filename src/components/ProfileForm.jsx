import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { setUserStorage, getUserStorage } from '../utils/userStorage';
import { getProfileData, postProfileData, patchProfileData } from '../utils/profileAPI';
import './ProfileForm.css';

function ProfileForm() {

    const [preloadedProfileValues, setPreloadedProfileValues] = useState(null);
    const { token, tokenParsed } = getUserStorage('ra_session');
    const [buttonText, setButtonText] = useState("register");
    let [isNotEmpty, setIsNotEmpty] = useState(0);



    useEffect(() => {
        getProfileData(token, tokenParsed).then(data => {
            if (data !== undefined) {
                if (data.id != null) {
                    setButtonText("Update");
                    setPreloadedProfileValues(data);
                    setIsNotEmpty(1);
                }
            }
        })
    }, []);


    /*
    useEffect(() => {
        getProfileData(token, tokenParsed).then(data => setPreloadedProfileValues(data))
 
    }, []); 
    */

    const { handleSubmit, register } = useForm({
    });

    async function processData(params) {

        if (isNotEmpty === 0) {
            postProfileData(params, token, tokenParsed);
            setButtonText("postaa Dataa");
        }
        else if (isNotEmpty > 0) {
            patchProfileData(params, token, tokenParsed);
            console.log("Pätsää Dataa")
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
                            defaultValue={preloadedProfileValues && preloadedProfileValues.height}
                            type="number"
                            name="height"
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formWeight">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                            ref={register}
                            defaultValue={preloadedProfileValues && preloadedProfileValues.weight}
                            type="number"
                            name="weight"
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formMedicalConditions">
                        <Form.Label>MedicalConditions</Form.Label>
                        <Form.Control
                            ref={register}
                            defaultValue={preloadedProfileValues && preloadedProfileValues.medical_conditions}
                            type="text"
                            name="medical_conditions"
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formDisabilities">
                        <Form.Label>Disabilities</Form.Label>
                        <Form.Control
                            ref={register}
                            defaultValue={preloadedProfileValues && preloadedProfileValues.disabilities}
                            type="text"
                            name="disabilities"
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formImageLink">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            ref={register}
                            defaultValue={preloadedProfileValues && preloadedProfileValues.image_link}
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