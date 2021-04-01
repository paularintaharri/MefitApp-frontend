import { Button, Card, Row, Col, ButtonGroup, Accordion } from "react-bootstrap";
import WorkoutDetail from "./WorkoutDetail";

function WorkoutCard({workout}) {

    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    <Row>
                        <Col>
                            <p>Workout: {workout.name}</p>
                        </Col>
                        <Col>
                            <p>Type: {workout.type}</p>
                        </Col>
                        <Col>
                            <ButtonGroup className="mb-2 mr-2" aria-label="Show details">
                                <Button type="button">Show details</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <WorkoutDetail workout={workout}/>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

export default WorkoutCard;