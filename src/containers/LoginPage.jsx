import './LoginPage.css';
import './ProfilePage';
import { Redirect, useHistory } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { setUserStorage, getUserStorage } from '../utils/userStorage';
import { Link } from 'react-router-dom';

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

            <Link to="/profile">Registrate</Link>


        </div>




    );
};

export default LoginPage;