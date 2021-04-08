import './ShowWorkouts.css';
import { Button, Modal } from 'react-bootstrap';

export const ShowWorkouts = ({ showModal, setShowModal, workout }) => {

    return (

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>Goal workout name</Modal.Title>
            </Modal.Header>
            <Modal.Body>{workout.length > 0 && <h5>{workout[0].name}</h5>}
                <br />
                    Exercise sets:
                    </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => setShowModal(false)}>
                    Close
                        </Button>
            </Modal.Footer>
        </Modal>
    )
};