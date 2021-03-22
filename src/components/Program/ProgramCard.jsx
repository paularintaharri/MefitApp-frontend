import { Button, Card, Row, Col, ButtonGroup, Accordion } from "react-bootstrap";
import ProgramDetail from "./ProgramDetail";

function ProgramCard() {

    const name = "Summer 2021";
    const category = "firm up";

    return (

        <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                    <Row>
                        <Col>
                            <p>Program: {name}</p>
                        </Col>
                        <Col>
                            <p>{category}</p>
                        </Col>
                        <Col>
                            <ButtonGroup className="mb-2 mr-2" aria-label="Show details">
                                <Button type="button" >Show details</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                    <ProgramDetail />
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
};

export default ProgramCard;