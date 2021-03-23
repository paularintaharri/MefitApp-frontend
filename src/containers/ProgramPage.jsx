import './ProgramPage.css';
import { useState } from "react";
import { Button, Form, FormControl, Container, ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import ProgramList from '../components/Program/ProgramList';
import UpdateProgram from '../components/Program/UpdateProgram';
import CreateProgram from '../components/Program/CreateProgram';


function ProgramPage() {

    const [modalProgramCreate, setModalProgramCreate] = useState(false);
    const [modalProgramUpdate, setModalProgramUpdate] = useState(false);

    function sortByCategory(){

    }

    return (
        <Container className="bd-content ps-lg-4">
            <h1>Programs</h1>
            <div className="nav justify-content-center">
                <Form inline >
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary" onClick={() => sortByCategory()}>Sort by Category</Button>
                </Form>
            </div>
            <ProgramList/>

            <ButtonGroup className="mb-2 mr-2" aria-label="Update Program">
                <Button type="button" className="btn btn-primary" variant="primary" onClick={() => setModalProgramCreate(true)}>Create New Program</Button>
                <CreateProgram show={modalProgramCreate} onHide={() => setModalProgramCreate(false)} />
            </ButtonGroup>

            <DropdownButton id="dropdown-basic-button" title="Update Program" >
                <Dropdown.Item onClick={() => setModalProgramUpdate(true)}>Action</Dropdown.Item>
                <Dropdown.Item onClick={() => setModalProgramUpdate(true)}>Another action</Dropdown.Item>
                <Dropdown.Item onClick={() => setModalProgramUpdate(true)}>Something else</Dropdown.Item>
            </DropdownButton>
            <UpdateProgram show={modalProgramUpdate} onHide={() => setModalProgramUpdate(false)} />
        </Container>
    );
};

export default ProgramPage;