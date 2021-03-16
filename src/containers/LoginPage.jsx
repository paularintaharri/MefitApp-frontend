import './LoginPage.css';
import { Redirect, useHistory } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { setUserStorage, getUserStorage } from '../utils/userStorage';

function LoginPage() {
    const history = useHistory();
    const user = getUserStorage('ra_session');

    function handleLoginComplete(username) {
        setUserStorage('ra_session', {
            session: { username }
        });
        history.replace("/profile");
    }

    return (
        <div className="header">
            { user && <Redirect to="/profile" />}
            <h1>MeFit App</h1>
            <LoginForm onClick={handleLoginComplete} />
        </div>
    );
};

export default LoginPage;