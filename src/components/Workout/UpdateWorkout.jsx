import { Modal, Card, Button, Form, Row, Col } from "react-bootstrap";
import { useState, useRef, useEffect } from 'react'
import { updateWorkout, getSetsForWorkout } from '../../utils/workoutAPI'
import { createSet } from '../../utils/setAPI'
import { getUserStorage } from '../../utils/userStorage';

function UpdateWorkout(props) {
    const workout = props.selectedworkout;
    const [exercises, setExercises] = useState([])
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({})
    const [sets, setSets] = useState([]);
    const [exerciseSetList, setExerciseSetList] = useState([]);
    const [setId, setSetId] = useState([]);
    const [exerciseinput, setExerciseInput] = useState();
    const setinput = useRef();
    const { token } = getUserStorage('ra_session')
    const setWorkouts = props.setWorkout;
    const selectedIndex = props.selectedIndex;
    const workouts = props.workouts;

    useEffect(() => {
        setExercises(props.exercises)
    }, [props.exercises]);

    //set current workout details to form
    useEffect(() => {
        setForm(workout);
    }, [workout]);

    useEffect(() => {
        setField('exerciseSets', setId);
    }, [setId]);

    useEffect(() => {
        const newSetIdList = [];
        const newExerciseSetList = [];
        sets.map(set => {
            exercises.map(exe => {
                if (exe.id == set.exercise.slice(18)) {
                    newExerciseSetList.push({ exercise: exe.name, exercise_repetitions: set.exercise_repetitions });
                }
            })
            newSetIdList.push({ 'id': set.id });
        })
        setSetId(newSetIdList);
        setExerciseSetList(newExerciseSetList);
    }, [sets]);

    //get sets of the workout
    useEffect(() => {
        async function fetchSetData() {
            try {
                const item = await getSetsForWorkout(workout, token);
                return item;
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchSetData().then(setsdata => {
            setSets(setsdata);
        })
    }, [workout]);

    //set default value for exercises dropdown
    useEffect(() => {
        if (exercises) {
            setExerciseInput(exercises[0])
        }
    }, [exercises])

    //set form fields
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

    //validation
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

    //submit form
    async function onSubmitClicked(e) {
        delete form['profiles']
        delete form['programs']
        delete form['goals']
        delete form['is_complete']
        e.preventDefault()
        const newErrors = findFormErrors()
        if (Object.keys(newErrors).length !== 0) {
            setErrors(newErrors)
        } else {
            try {
                const createdItem = await updateWorkout(form, token);
                let newArr = workouts;
                newArr[selectedIndex] = createdItem;
                setWorkouts(newArr);
            } catch (error) {
                console.error(error.message);
            }
            alert('Submitted!')
           closeWindow();
        }
    };

    //clear states and close window
    function closeWindow(){
        props.onHide()
        setExerciseSetList([]);
        setSetId([]);
    }

    //create and add new set of workouts to the list
    function addToList(e) {
        e.preventDefault();
        const newSet = ({ exercise: { "id": exerciseinput.id }, exercise_repetitions: parseInt(setinput.current.value) });
        setExerciseSetList([...exerciseSetList, { exercise: exerciseinput.name, exercise_repetitions: parseInt(setinput.current.value) }]);
        createNewSet(newSet);
    }

    //create new workout API request
    async function createNewSet(newSet) {
        try {
            const id = await createSet(newSet, token);
            setSetId([...setId, { 'id': id }]);
        } catch (error) {
            console.error(error.message);
        }
    }

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
                            <Form.Label column sm="2">Id:</Form.Label>
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

                        <Form.Group>
                            <Form.Label>Selected Exercises:</Form.Label> <br></br>
                            {exerciseSetList.map(set =>
                                <p>{set.exercise} (Repetitions: {set.exercise_repetitions})</p>
                            )}
                        </Form.Group>

                        <Button type="submit">Submit</Button>
                    </Form>
                    <Form onSubmit={addToList}>
                        <Card className="set-card">
                            <Card.Body>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Sets</Form.Label>
                                        <Form.Control type="text"
                                            placeholder="10"
                                            required
                                            ref={setinput} />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <Form.Label>Exercises</Form.Label>
                                        <Form.Control
                                            onChange={(e) => setExerciseInput(exercises[e.target.value])}
                                            as="select" className="mr-sm-2" custom required>
                                            {exercises.length !== 0 && exercises.map((exercise, index) =>
                                                <option key={exercise.id} value={index}>
                                                    {exercise.id}: {exercise.name}
                                                </option>)}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Button style={{ margin: '2em 0' }} type="submit">Add Exercise</Button>
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
        </Modal>
    );
};

export default UpdateWorkout;
