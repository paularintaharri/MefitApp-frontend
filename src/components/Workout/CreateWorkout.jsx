import { Modal, Card, Button, Form } from "react-bootstrap";
import { useState } from 'react'
import { createWorkout } from '../../utils/workoutAPI'

function CreateWorkout(props) {

    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({})

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
        e.preventDefault()
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length !== 0) {
            setErrors(newErrors)
        } else {
            try {
                await createWorkout(form);
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
                    <h3>Create New Workout</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card.Body>
                    <Form onSubmit={onSubmitClicked}>
                        <Form.Group>
                            <Form.Label>Workour Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Workout Name"
                                onChange={e => setField('name', e.target.value)}
                                isInvalid={!!errors.name} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Workout Type</Form.Label>
                            <Form.Control type="text"
                                placeholder="Type"
                                onChange={e => setField('type', e.target.value)}
                                isInvalid={!!errors.type} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.type}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Sets</Form.Label>
                            <Form.Control type="sets" placeholder="Sets" />
                        </Form.Group>
                        {/* <Form.Group>
                            <Form.Label>Exercises included</Form.Label>
                            <Form.Control as="select" multiple>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
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

export default CreateWorkout;
