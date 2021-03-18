import './WorkoutPage.css';
import { useState } from "react";
import { Button, Form, FormControl, Container, ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import WorkoutList from '../components/Workout/WorkoutList';
import CreateWorkout from '../components/Workout/CreateWorkout';
import UpdateWorkout from '../components/Workout/UpdateWorkout';

function WorkoutPage() {

    const [modalWorkoutCreate, setModalWorkoutCreate] = useState(false);
    const [modalWorkoutUpdate, setModalWorkoutUpdate] = useState(false);

    function sortByType() {

    }

    return (

        <Container class="bd-content ps-lg-4">
            <h1>WorkotPage</h1>
            <div class="nav justify-content-center">
                <Form inline >
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary" onClick={() => sortByType()}>Sort by Workout Type</Button>
                </Form>
            </div>
            <WorkoutList />

            <UpdateWorkout />
            <ButtonGroup className="mb-2 mr-2" aria-label="Update Exercise">
                <Button type="button" class="btn btn-primary" variant="primary" onClick={() => setModalWorkoutCreate(true)}>Create New Exercise</Button>
                <CreateWorkout show={modalWorkoutCreate} onHide={() => setModalWorkoutCreate(false)} />
            </ButtonGroup>

            <DropdownButton id="dropdown-basic-button" title="Update Workout" >
                <Dropdown.Item onClick={() => setModalWorkoutUpdate(true)}>Action</Dropdown.Item>
                <Dropdown.Item onClick={() => setModalWorkoutUpdate(true)}>Another action</Dropdown.Item>
                <Dropdown.Item onClick={() => setModalWorkoutUpdate(true)}>Something else</Dropdown.Item>
            </DropdownButton>
            <UpdateWorkout show={modalWorkoutUpdate} onHide={() => setModalWorkoutUpdate(false)} />
        </Container>
    );
};

export default WorkoutPage;