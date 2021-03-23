import { Button, Card, Row, Col, ButtonGroup } from "react-bootstrap";
import { useState } from "react";
import ExerciseDetail from "./ExerciseDetail";

function ExerciseCard({exercise}, props) {
    const [modalExerciseDetail, setModalExerciseDetail] = useState(false);
    const [currentexercise, setCurrentExercise] = useState(exercise);

    return (
        <Card>
            <Card.Body className="exercise-card-body">
            <Row>
                <Col>
                    <p>Exercise: {exercise.name}</p>
                </Col>
                <Col>
                    <p>Muscle group: {exercise.target_muscle_group}</p>
                </Col>
                <Col>
                    <ButtonGroup className="mb-2 mr-2" aria-label="Show details">
                        <Button type="button" onClick={() => setModalExerciseDetail(true)}>Show details</Button>
                        <ExerciseDetail show={modalExerciseDetail} onHide={() => setModalExerciseDetail(false)}
                        currentexercise={currentexercise}/>
                    </ButtonGroup>
                </Col>
            </Row>
            </Card.Body>
        </Card>
    );
};

export default ExerciseCard;