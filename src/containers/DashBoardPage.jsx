import { Button, Form, FormControl, Container, ButtonGroup, Col } from "react-bootstrap";
import './DashBoardPage.css';
import GetGoals from '../components/Dashboard/GetGoals';
import CreateGoal from '../components/Dashboard/CreateGoal';
import Clock from '../components/Dashboard/Clock';
import { useEffect, useState } from "react";

function DashBoardPage() {
    const [modalGoalCreate, setModalGoalCreate] = useState(false);
    const [addedGoals, setAddedGoals] = useState([]);

    return (

        <div>
            <br />
            <Clock />
            <br />
            <GetGoals addedGoals={addedGoals}/>

            <div style={{ margin: "1em" }}>
                <ButtonGroup className="mb-2 mr-2" aria-label="Update Workout">
                    <Button
                        type="button"
                        className="btn btn-primary"
                        variant="primary"
                        onClick={() => setModalGoalCreate(true)}>Add New Goal
                    </Button>
                    <CreateGoal
                        show={modalGoalCreate}
                        onHide={() => setModalGoalCreate(false)}
                        setAddedGoals={setAddedGoals}
                    />
                </ButtonGroup></div>
        </div>
    )
}

export default DashBoardPage