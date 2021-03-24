import { Modal, Card, Button, Form } from "react-bootstrap";

function CreateProgram(props) {

    function onSubmitClicked(e) {
        //props.onClick(name)
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h3>Create New Program</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Program Name</Form.Label>
                            <Form.Control autoFocus type="program-name" placeholder="Program Name" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="category" placeholder="Category" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Workouts included</Form.Label>
                            <Form.Control as="select" multiple>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
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

export default CreateProgram;
