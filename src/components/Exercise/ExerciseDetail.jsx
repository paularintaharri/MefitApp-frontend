import { Modal, Button } from "react-bootstrap";

function ExerciseDetails(props) {

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>Pull Ups</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Target muscle group</h4>
                    <p>Triceps</p>
                <h4>Description</h4>
                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.</p>
                <h4>Link to video</h4>
                    <a href="www.link.com">www.link.com</a>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ExerciseDetails;
