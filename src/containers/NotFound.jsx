import { Link } from 'react-router-dom';
const NotFound = () => (
    <div>
        <h1>Page not found.</h1>
        <Link to="/login">Go to login page</Link>
    </div>
);

export default NotFound;