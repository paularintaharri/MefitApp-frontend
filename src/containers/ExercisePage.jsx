import './ExercisePage.css';
import { useState } from "react";
import { Button, Form, FormControl, Container, ButtonGroup, DropdownButton, Dropdown, Card, Row, Col } from "react-bootstrap";
import CreateExercise from '../components/Exercise/CreateExercise';
import ExerciseList from '../components/Exercise/ExerciseList';
import UpdateExercise from '../components/Exercise/UpdateExercise';

function ExercisePage() {
    const [modalExerciseCreate, setModalExerciseCreate] = useState(false);
    const [modalExerciseUpdate, setModalExerciseUpdate] = useState(false);

    function sortByTargetMuscleGroup() {

    }

    return (
        <Container class="bd-content ps-lg-4">
            <h1>ExercisePage</h1>
            <div class="nav justify-content-center">
                <Form inline >
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary" onClick={() => sortByTargetMuscleGroup()}>Sort by target muscle group</Button>
                </Form>
            </div>
            <ExerciseList />
            <ButtonGroup className="mb-2 mr-2" aria-label="Update Exercise">
                <Button type="button" class="btn btn-primary" variant="primary" onClick={() => setModalExerciseCreate(true)}>Create New Exercise</Button>
                <CreateExercise show={modalExerciseCreate} onHide={() => setModalExerciseCreate(false)} />
            </ButtonGroup>

            <DropdownButton id="dropdown-basic-button" title="Update Exercise" >
                <Dropdown.Item onClick={() => setModalExerciseUpdate(true)}>Action</Dropdown.Item>
                <Dropdown.Item onClick={() => setModalExerciseUpdate(true)}>Another action</Dropdown.Item>
                <Dropdown.Item onClick={() => setModalExerciseUpdate(true)}>Something else</Dropdown.Item>
            </DropdownButton>
            <UpdateExercise show={modalExerciseUpdate} onHide={() => setModalExerciseUpdate(false)} />

        </Container>
    );
};

export default ExercisePage;