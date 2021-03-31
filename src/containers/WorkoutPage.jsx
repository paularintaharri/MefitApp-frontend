import './WorkoutPage.css';
import { useState, useEffect } from "react";
import { Button, Form, Container, ButtonGroup, Col } from "react-bootstrap";
import WorkoutList from '../components/Workout/WorkoutList';
import CreateWorkout from '../components/Workout/CreateWorkout';
import UpdateWorkout from '../components/Workout/UpdateWorkout';
import { getAllWorkouts } from '../utils/workoutAPI';
import { getAllExercises } from "../utils/exerciseAPI";

function WorkoutPage() {
    const [modalWorkoutCreate, setModalWorkoutCreate] = useState(false);
    const [modalWorkoutUpdate, setModalWorkoutUpdate] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [exercises, setExercises] = useState([]);

    const [selectedworkout, setSelectedWorkout] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchWorkoutData() {
            try {
                const item = await getAllWorkouts();
                return item;
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchWorkoutData().then(workouts => {
            setWorkouts(workouts);
            setIsLoading(false);
        })

        async function fetchExerciseData() {
            try {
                const item = await getAllExercises();
                return item;
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchExerciseData().then(exercises => {
            setExercises(exercises);
            setIsLoading(false);
        })
    }, []);

    useEffect(() => {
        if (workouts) {
            setSelectedWorkout(workouts[0])
        }
    }, [workouts])

    return (
        <Container className="bd-content ps-lg-4">
            {isLoading && <p>loading</p>}
            {workouts.length !== 0 && (
                <div>
                    <h1>Workouts</h1>
                    <WorkoutList workouts={workouts} />
                    <ButtonGroup className="mb-2 mr-2" aria-label="Update Workout">
                        <Button
                            type="button"
                            className="btn btn-primary"
                            variant="primary"
                            onClick={() => setModalWorkoutCreate(true)}>
                            Create New Workout
                    </Button>
                        <CreateWorkout
                            show={modalWorkoutCreate}
                            exercises={exercises}
                            onHide={() => setModalWorkoutCreate(false)} />
                    </ButtonGroup>
                </div>
            )}
            { selectedworkout != null &&
                <div className="nav justify-content-center">
                    <Form.Row className="align-items-center">
                        <Col xs="auto" className="my-1">
                            <Form.Control
                                onChange={(e) => setSelectedWorkout(workouts[e.target.value])}
                                as="select" className="mr-sm-2" custom>
                                {workouts.map((workout, index) =>
                                    <option key={index} value={index}>
                                        {workout.id}: {workout.name}
                                    </option>)}
                            </Form.Control>
                        </Col>
                        <Col xs="auto" className="my-1">
                            <Button type="submit" onClick={() => setModalWorkoutUpdate(true)}>Update Selected Workout
                                </Button>
                            <UpdateWorkout show={modalWorkoutUpdate} onHide={() => setModalWorkoutUpdate(false)}
                                selectedworkout={selectedworkout} />
                        </Col>
                    </Form.Row>
                </div>
            }
        </Container>
    );
};

export default WorkoutPage;