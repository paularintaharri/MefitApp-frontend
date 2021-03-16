import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function LoginForm(props) {
    const [name, setName] = useState("");

    function validateForm() {
        return name.length > 0;
    };

    function onSubmitClicked(e) {
        props.onClick(name)
    };

    function onNameChanged(e) {
        setName(e.target.value.trim());
    }

    return (
        <Form>
            <Form.Group>
                <Form.Label>Username</Form.Label>
            </Form.Group>
            <Form.Group>
                <Form.Control className="login-form" autoFocus type="username" placeholder="What's your name?" value={name} onChange={onNameChanged} />
            </Form.Group>
            <Button className="button-green" variant="info" type="submit" disabled={!validateForm()} onClick={onSubmitClicked}>Submit</Button>
        </Form>
    );
};

export default LoginForm;