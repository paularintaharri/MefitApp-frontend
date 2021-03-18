import { Modal, Card, Button, Form } from "react-bootstrap";

function CreateWorkout(props) {

    function onSubmitClicked(e) {
        //props.onClick(name)
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>Create New Workout</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Workour Name</Form.Label>
                            <Form.Control autoFocus type="workour-name" placeholder="Workout Name" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Type</Form.Label>
                            <Form.Control type="type" placeholder="Type" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Sets</Form.Label>
                            <Form.Control type="sets" placeholder="Sets" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Exercises included</Form.Label>
                            <Form.Control type="sets" placeholder="Exercises included" />
                        </Form.Group>
                        <Button type="submit" onClick={onSubmitClicked}>Submit</Button>
                    </Form>
                </Card.Body>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateWorkout;
