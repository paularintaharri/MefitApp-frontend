import { useEffect, useState, useRef } from 'react';
import './GetGoals.css';
import { getUserStorage } from '../../utils/userStorage';
import { Button, Card, Row, Col, ButtonGroup, Accordion, ProgressBar } from "react-bootstrap";
import { getGoalData } from '../../utils/goalsAPI';
import Modal from 'react-modal';


function GetGoals(props) {

    const { token, tokenParsed } = getUserStorage('ra_session')
    const [goals, setGoals] = useState([]);
    const addedGoals = props.addedGoals;

    useEffect(() => {
        setGoals([...goals, addedGoals])
    }, [addedGoals]);

    useEffect(() => {

        if (tokenParsed) {
            getGoalData(token, tokenParsed).then(data => {
                setGoals(data)
                console.log("goals added: " + JSON.stringify(data));
            })
        }
    }, [token]);

    return (
        <div>
            {goals.map(data => (
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                            <Row>
                                <Col>
                                    <p id="endTime">Goal end date: {data && data.end_date}</p>
                                </Col>
                                <Col>
                                    <p id="progress">Progress: </p>
                                    <ProgressBar now={35} />
                                </Col>
                                <Col>
                                    <ButtonGroup className="mb-2 mr-2" aria-label="Show details">
                                        <Button type="button" >Show details</Button>
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