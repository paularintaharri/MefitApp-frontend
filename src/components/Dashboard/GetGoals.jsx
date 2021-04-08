import { useEffect, useState } from 'react';
import { getUserStorage } from '../../utils/userStorage';
import { Button, Card, Row, Col, ButtonGroup, Accordion, ProgressBar } from "react-bootstrap";
import { getGoalData, getWorkoutData } from '../../utils/goalsAPI';
import { ShowWorkouts } from './ShowWorkouts';
import './GetGoals.css';

function GetGoals(props) {

    const { token, tokenParsed } = getUserStorage('ra_session')
    const [goals, setGoals] = useState([]);
    const [workout, setWorkout] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const addedGoals = props.addedGoals;

    //get workout data and show in modal
    const openModal = (goal, index) => {
        getWorkoutData(token, goal).then(data => {
            if (data !== undefined) {
                setWorkout(data);
                setShowModal(Prev => !Prev)
            }
        })
    }

    //get goal data
    useEffect(() => {
        if (tokenParsed) {
            getGoalData(token, tokenParsed).then(data => {
                setGoals(data)
            })
        }
    }, [token, addedGoals]);

    return (
        <div>
            {goals.map((goal, index) => (
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            <Row>
                                <Col>
                                    <p id="endTime">Goal end date: {goal && goal.end_date}</p>
                                </Col>
                                <Col>
                                    <p id="progress">Progress: </p>
                                    <ProgressBar now={35} />
                                </Col>
                                <Col>
                                    <ButtonGroup className="mb-2 mr-2" aria-label="Show details">
                                        <Button id="detailButton" type="button" onClick={e => openModal(goal, index)}>Show details</Button>
                                        <ShowWorkouts showModal={showModal} setShowModal={setShowModal} key={index} workout={workout} />
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Accordion.Toggle>
                    </Card>
                </Accordion>
            ))}
        </div>
    )
}

export default GetGoals