import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import './ProfileForm.css';

function ProfileForm() {

    const id = '2';
    const Url = 'http://me-fit-app.herokuapp.com/api/v1/profiles/';

    const [preloadedValues, setPreloadedValues] = useState({});


    let valuesFromServer = {
        first_name: preloadedValues.first_name,
        last_name: preloadedValues.last_name
    }


    useEffect(() => {
        getData(id).then(data => setPreloadedValues(data))

    }, []);


    const { register, handleSubmit } = useForm({
        defaultValues: valuesFromServer
    });


    async function getData(id) {

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

    async function postData(params) {

        try {
            let response = await fetch(Url, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
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
            <Form onSubmit={handleSubmit(postData)}>
                <Form.Group controlId="formFirstName">
                    <Form.Label>First name</Form.Label>
                    <input
                        ref={register}
                        defaultValue={preloadedValues.first_name}
                        type="text"
                        name="first_name"
                    />
                </Form.Group>
                <br />

                <Form.Group controlId="formLastName"></Form.Group>
                <Form.Label>Last name</Form.Label>
                <input
                    ref={register}
                    defaultValue={preloadedValues.last_name}
                    type="text"
                    name="last_name"
                />


                <br />
                <input
                    ref={register}
                    defaultValue={preloadedValues.height}
                    type="text"
                    name="weight"
                />
                <br />
                <input
                    ref={register}
                    defaultValue={preloadedValues.weight}
                    type="text"
                    name="height"
                />
                <br />
                <input
                    ref={register}
                    placeholder={preloadedValues.medical_conditions}
                    type="text"
                    name="medical_conditions"
                />

                <br />
                <input
                    ref={register}
                    placeholder={preloadedValues.disabilities}
                    type="text"
                    name="disabilities"
                />
                <br />
                <input
                    ref={register}
                    placeholder={preloadedValues.image_link}
                    type="text"
                    name="disabilities"
                />
                <button>Submit</button>
            </Form>



            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
  </Button>
            </Form>



        </div >
    );
};
export default ProfileForm;