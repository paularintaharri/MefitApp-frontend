import { Link } from 'react-router-dom';
import ApplicationFrame from '../components/ApplicationFrame';

const NotFound = () => (
    <div>
        <ApplicationFrame />
        <br />
        <h1>Page not found.</h1>
        <Link to="/login">Go to login page</Link>
    </div>
);

export default NotFound;