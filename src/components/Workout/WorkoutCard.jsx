import { Button, Card, Row, Col, ButtonGroup, Accordion } from "react-bootstrap";
import WorkoutDetail from "./WorkoutDetail";

function WorkoutCard() {

    const type = "Cardio";
    const name = "15 min Beginner Cardio";

    return (

        <Accordion defaultActiveKey="1">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        <Row>
                            <Col>
                                <p>{name}</p>
                            </Col>
                            <Col>
                                <p>Type: {type}</p>
                            </Col>
                            <Col>
                                <ButtonGroup className="mb-2 mr-2" aria-label="Show details">
                                    <Button type="button" >Show details</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <WorkoutDetail/>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

export default WorkoutCard;