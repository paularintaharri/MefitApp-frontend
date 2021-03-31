import { Modal, Card, Button, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect } from 'react'
import { updateExercises } from '../../utils/exerciseAPI'

function UpdateExercise(props) {
    const exercise = props.selectedexercise;
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({})

    useEffect(() => {
        setForm(exercise);
    }, [exercise]);

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
        const { name, target_muscle_group } = form
        var regex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
        const newErrors = {}
        if (!name || name === '') {
            newErrors.name = 'cannot be blank!'
        } else if (name.length > 30) {
            newErrors.name = 'name is too long!'
        } else if (!name.match(regex)) {
            newErrors.name = 'field must not include spesial characters'
        }
        if (!target_muscle_group || target_muscle_group === '') {
            newErrors.target_muscle_group = 'add a target muscle group!'
        } else if (!target_muscle_group.match(regex)) {
            newErrors.target_muscle_group = 'field must not include spesial characters'
        }
        return newErrors
    }

    async function onSubmitClicked(e) {
        delete form['exerciseSets']
        e.preventDefault()
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length !== 0) {
            setErrors(newErrors)
        } else {
            try {
                await updateExercises(form);
                alert('Submitted!')
            } catch (error) {
                console.error(error.message);
                alert('Error!')
            }
            props.onHide()
        }
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>Updaxte Exercises</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card.Body>
                    <Form onSubmit={onSubmitClicked}>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Id:</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={exercise.id}/>
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Exercise Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                defaultValue={exercise.name}
                                onChange={e => setField('name', e.target.value)}
                                isInvalid={!!errors.name} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea"
                                rows={3}
                                type="text"
                                defaultValue={exercise.description}
                                onChange={e => setField('description', e.target.value)}
                                isInvalid={!!errors.description} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.description}
                            </Form.Control.Feedback>   
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Target muscle group</Form.Label>
                            <Form.Control type="text"
                                defaultValue={exercise.target_muscle_group}
                                onChange={e => setField('target_muscle_group', e.target.value)}
                                isInvalid={!!errors.target_muscle_group} />
                            <Form.Control.Feedback type='invalid'>
                                {errors.target_muscle_group}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Link to video</Form.Label>
                            <Form.Control type="text"
                                defaultValue={exercise.vid_link}
                                onChange={e => setField('vid_link', e.target.value)} />
                        </Form.Group>
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

export default UpdateExercise;
