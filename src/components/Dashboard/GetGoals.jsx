import { useEffect, useState, useRef } from 'react';
import './GetGoals.css';
import { getUserStorage } from '../../utils/userStorage';
import { Button, Card, Row, Col, ButtonGroup, Accordion } from "react-bootstrap";

function GetGoals() {

    const goal = "Run like you just robbed a bank";
    const endTime = "5 days, for hours";




    const { token, tokenParsed } = getUserStorage('ra_session')
    let id;

    if (tokenParsed) {
        id = tokenParsed.sub;
    }

    const url = `https://me-fit-app.herokuapp.com/api/v1/profiles/${id}/goals`;
    const [goals, setGoals] = useState({});

    useEffect(() => {
        if (id) {
            getGoalData().then(data => {
                setGoals(data)
                console.log("goals added: " + JSON.stringify(goals));
            })
        }
    }, []);

    async function getGoalData() {
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            let responseJson = await response.json();
            console.log("incoming goals: " + JSON.stringify(responseJson));
            return responseJson;
        } catch (error) {
            console.log("error is: " + error);
        }
    }



    return (

        <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    <Row>
                        <Col>
                            <p>Goal: {goal}</p>
                            <p>Endtime: {endTime}</p>
                        </Col>
                        <Col>
                            <p>Progress: </p>

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



    )

}

export default GetGoals