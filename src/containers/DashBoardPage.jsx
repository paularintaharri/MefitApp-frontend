import { Button, Form, FormControl, Container, ButtonGroup, Col } from "react-bootstrap";
import './DashBoardPage.css';
import GetGoals from '../components/Dashboard/GetGoals';
import CreateGoal from '../components/Dashboard/CreateGoal';
import Clock from '../components/Dashboard/Clock';
import { useEffect, useState } from "react";

function DashBoardPage() {
    const [modalGoalCreate, setModalGoalCreate] = useState(false);

    return (

        <div>
            <br />
            <Clock />
            <br />
            <GetGoals />

            <ButtonGroup className="mb-2 mr-2" aria-label="Update Workout">
                            <Button
                                type="button"
                                className="btn btn-primary"
                                variant="primary"
                                onClick={() => setModalGoalCreate(true)}>
                                Add New Goal
                            </Button>
                            <CreateGoal
                                show={modalGoalCreate}
                                // exercises={exercises}
                                // onHide={() => setModalWorkoutCreate(false)} 
                                // setWorkouts={setWorkouts}
                                />
                        </ButtonGroup>
        </div>
    )
}

export default DashBoardPage