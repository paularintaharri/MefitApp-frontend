import { Modal, Button } from "react-bootstrap";

function ExerciseDetails(props) {
    const exercise = props.currentexercise;

    return (
        <Modal  {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>{exercise.name}</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Target muscle group</h4>
                <p>{exercise.target_muscle_group}</p>
                <h4>Description</h4>
                <p>{exercise.description}</p>
                <h4>Link to video</h4>
                <a href={`${exercise.vid_link}`}>{exercise.vid_link}</a>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ExerciseDetails;
