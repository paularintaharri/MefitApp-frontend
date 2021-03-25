import { Card } from "react-bootstrap";
import ExerciseCard from "../Exercise/ExerciseCard";

function WorkoutDetails(props) {;

    //Get exersises by weorkout
    return (
        <Card.Body>
            {/* <ExerciseCard /> */}
            <h4>Sets</h4>
            <p>5</p>
        </Card.Body>
    );
};

export default WorkoutDetails;
