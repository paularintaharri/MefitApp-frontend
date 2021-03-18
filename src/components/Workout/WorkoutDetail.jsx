import { Card } from "react-bootstrap";
import ExerciseCard from "../Exercise/ExerciseCard";

function WorkoutDetails() {;

    return (
        <Card.Body>
            <h4>Exercises included</h4>
            <ExerciseCard />
            <h4>Sets</h4>
            <p>5</p>
        </Card.Body>
    );
};

export default WorkoutDetails;
