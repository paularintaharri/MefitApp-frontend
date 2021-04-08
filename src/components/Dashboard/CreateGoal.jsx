import { Modal, Card, Button, Form, Col } from "react-bootstrap";
import { useState, useEffect } from 'react'
import { getUserStorage } from '../../utils/userStorage';
import { getAllWorkouts } from '../../utils/workoutAPI';
import { createGoal } from '../../utils/goalsAPI';

function CreateGoal(props) {
    const [workouts, setWorkouts] = useState([])
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({})
    const [workoutInput, setWorkoutInput] = useState([]);
    const [workoutIds, setWorkoutIds] = useState([]);
    const [workoutList, setWorkoutList] = useState([]);
    const { token, tokenParsed } = getUserStorage('ra_session')
    const setGoals = props.setAddedGoals;

    //set default value for workouts dropdown
    useEffect(() => {
        if (workouts) {
            setWorkoutInput(workouts[0])
        }
    }, [workouts]);

    //set selected workouts to the form
    useEffect(() => {
        setField('workouts', workoutIds)
    }, [workoutIds]);

    //set user id to the form
    useEffect(() => {
        if (tokenParsed) {
            setField('profile', { 'id': tokenParsed.sub })
        }
    }, []);

    //get all workouts
    useEffect(() => {
        if (token) {
            async function fetchWorkoutData() {
                try {
                    const item = await getAllWorkouts(token);
                    return item;
                } catch (error) {
                    console.error(error.message);
                }
            }
            fetchWorkoutData().then(workouts => {
                setWorkouts(workouts);
            })
        }
    }, [token]);

    //set form inputs to state
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

    //find errors
    const findFormErrors = () => {
        const newErrors = {}
        if (workoutList.length === 0) {
            newErrors.workoutselected = 'Select and add workout'
        }
        return newErrors
    }

    //crete new workout
    async function onSubmitClicked(e) {
        e.preventDefault();
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length !== 0) {
            setErrors(newErrors)
        } else {
            try {
                const createdItem = await createGoal(form, token);
                setGoals((previousList => [
                    ...previousList, createdItem]))
                alert('Submitted!')
            } catch (error) {
                console.error(error.message);
                alert('Error!')
            }
            closeWindow();
        }
    };

    //clear states and close window
    function closeWindow() {
        props.onHide()
        setWorkoutList([]);
        setWorkoutIds([]);
    }

    //create new set
    function addToList(e) {
        e.preventDefault();
        setWorkoutList([...workoutList, workoutInput]);
        setWorkoutIds([...workoutIds, { 'id': workoutInput.id }]);
        setErrors([])
    }

    function formatDate(e) {
        let date = new Date(e.target.value);
        let formatted = date.getDate() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();
        setField('end_date', formatted);
    }

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>Add New Goal</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card.Body>
                    <Form onSubmit={onSubmitClicked}>
                        <Form.Group>
                            <Form.Label>Goal end date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                required
                                onChange={formatDate}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Selected workouts:</Form.Label> <br></br>
                            {workoutList.map(workout =>
                                <p>Name: {workout.name}</p>
                            )}
                        </Form.Group>
                        <Button type="submit">Submit</Button>
                    </Form>

                    <Form onSubmit={addToList}>
                        <Card className="set-card">
                            <Card.Body>
                                <Form.Row>
                                    <Form.Group as={Col} >
                                        <Form.Label>Workouts</Form.Label>
                                        <Form.Control
                                            onChange={(e) => setWorkoutInput(workouts[e.target.value])}
                                            as="select" className="mr-sm-2" custom
                                            isInvalid={!!errors.workoutselected} >
                                            {workouts.map((workout, index) =>
                                                <option key={index} value={index}>
                                                    {workout.id}: {workout.name}
                                                </option>)}
                                        </Form.Control>
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.workoutselected}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Button style={{ margin: '2em 0' }} type="submit">Add workout</Button>
                                    </Form.Group>
                                </Form.Row>
                            </Card.Body>
                        </Card>
                    </Form>
                </Card.Body>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeWindow}>Close</Button>
            </Modal.Footer>
        </Modal >
    );
};

export default CreateGoal;
