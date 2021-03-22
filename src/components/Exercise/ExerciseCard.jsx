import { Button, Card, Row, Col, ButtonGroup } from "react-bootstrap";
import { useState } from "react";
import ExerciseDetail from "./ExerciseDetail";

function ExerciseCard(props) {
    const [modalExerciseDetail, setModalExerciseDetail] = useState(false);

    const muscelGroup = "Triceps";
    const name = "Pull Ups";

    return (
        <Card>
            <Card.Body>
            <Row>
                <Col>
                    <p>{name}</p>
                </Col>
                <Col>
                    <p>Muscel group: {muscelGroup}</p>
                </Col>
                <Col>
                    <ButtonGroup className="mb-2 mr-2" aria-label="Show details">
                        <Button type="button" onClick={() => setModalExerciseDetail(true)}>Show details</Button>
                        <ExerciseDetail show={modalExerciseDetail} onHide={() => setModalExerciseDetail(false)}/>
                    </ButtonGroup>
                </Col>
            </Row>
            </Card.Body>
        </Card>
    );
};

export default ExerciseCard;