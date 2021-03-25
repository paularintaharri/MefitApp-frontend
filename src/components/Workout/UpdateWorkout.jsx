import { Modal, Card, Button, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect } from 'react'
import { updateWorkout } from '../../utils/workoutAPI'

function UpdateWorkout(props) {
    const workout = props.selectedworkout;
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({})

    useEffect(() => {
        setForm(workout);
    }, [workout]);

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const findFormErrors = () => {
        const { name, type } = form
        var regex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
        const newErrors = {}
        if (!name || name === '') {
            newErrors.name = 'cannot be blank!'
        } else if (name.length > 30) {
            newErrors.name = 'name is too long!'
        } else if (!name.match(regex)) {
            newErrors.name = 'field must not include spesial characters'
        }
        if (!type || type === '') {
            newErrors.type = 'add a target muscle group!'
        } else if (!type.match(regex)) {
            newErrors.type = 'field must not include spesial characters'
        }
        return newErrors
    }

    async function onSubmitClicked(e) {
        delete form['profiles']
        delete form['programs']
        delete form['goals']
        e.preventDefault()
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length !== 0) {
            setErrors(newErrors)
        } else {
            try {
                await updateWorkout(form);
            } catch (error) {
                console.error(error.message);
            }
            alert('Submitted!')
            props.onHide()
        }
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>Update Workout</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card.Body>
                    <Form onSubmit={onSubmitClicked}>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2"> Id: </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={workout.id} />
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Workout Name</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={workout.name}
                                onChange={e => setField('name', e.target.value)}
                                isInvalid={!!errors.name} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Workout Type</Form.Label>
                            <Form.Control type="text"
                                defaultValue={workout.type}
                                onChange={e => setField('type', e.target.value)}
                                isInvalid={!!errors.type} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.type}
                            </Form.Control.Feedback>
                        </Form.Group>
                        {/* <Form.Group>
                            <Form.Label>Sets</Form.Label>
                            <Form.Control type="sets" placeholder="Sets" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Exercises included</Form.Label>
                            <Form.Control type="sets" placeholder="Exercises included" />
                        </Form.Group> */}
                        <Button type="submit">Submit</Button>
                    </Form>
                </Card.Body>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateWorkout;
