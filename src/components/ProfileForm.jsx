import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { setUserStorage, getUserStorage } from '../utils/userStorage';
import { getProfileData, patchProfileData } from '../utils/profileAPI';
import './ProfileForm.css';

function ProfileForm() {

    const [preloadedProfileValues, setPreloadedProfileValues] = useState(null);
    const { token, tokenParsed } = getUserStorage('ra_session');

    useEffect(() => {
        getProfileData(token, tokenParsed).then(data => setPreloadedProfileValues(data))

    }, []);

    const { handleSubmit, register } = useForm({
    });

    async function processData(params) {

        console.log("params: " + JSON.stringify(params));
        patchProfileData(params, token, tokenParsed);
    }

    return (
        <div>
            <div id="form">
                <Form onSubmit={handleSubmit(processData)}>
                    <br />
                    <Form.Group controlId="formHeight">
                        <Form.Label>Height</Form.Label>
                        <Form.Control
                            defaultValue={preloadedProfileValues && preloadedProfileValues.height}
                            type="number"
                            name="weight"
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formWeight">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control
                            ref={register}
                            defaultValue={preloadedProfileValues && preloadedProfileValues.weight}
                            type="number"
                            name="height"
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formMedicalConditions">
                        <Form.Label>MedicalConditions</Form.Label>
                        <Form.Control
                            ref={register}
                            placeholder={preloadedProfileValues && preloadedProfileValues.medical_conditions}
                            type="text"
                            name="medical_conditions"
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formDisabilities">
                        <Form.Label>Disabilities</Form.Label>
                        <Form.Control
                            ref={register}
                            placeholder={preloadedProfileValues && preloadedProfileValues.disabilities}
                            type="text"
                            name="disabilities"
                        />
                    </Form.Group>
                    <br />
                    <Form.Group controlId="formImageLink">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            ref={register}
                            placeholder={preloadedProfileValues && preloadedProfileValues.image_link}
                            type="text"
                            name="image_link"
                        />
                    </Form.Group>
                    {/* <br />
                    <Form.Group controlId="formBasicChecbox">
                        <Form.Check name="checkBox" type="checkbox" label="I want to be a contributor" value="false" defaultChecked={preloadedUserValues.is_contributor} />
                    </Form.Group> */}
                    <Button variant="primary" size="lg" type="submit" >Update</Button>
                </Form>
            </div>
        </div>
    );
};

export default ProfileForm;