import {Card, Button, Form, Modal } from "react-bootstrap";

function UpdateExercise(props) {

    function onSubmitClicked(e) {
        //props.onClick(name)
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>Update Exercise</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Exercise Name</Form.Label>
                            <Form.Control autoFocus type="exercis-name" placeholder="Exercis Name" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} type="Description" placeholder="Description" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Target muscel group</Form.Label>
                            <Form.Control type="muscel-group" placeholder="Target muscel group" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Link to video</Form.Label>
                            <Form.Control type="muscel-group" placeholder="Video link" />
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

export default UpdateExercise;
