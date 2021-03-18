import { Link } from 'react-router-dom';
const NoMatch = ({ location }) => {
    return (
        <div>
            <h3>No match for <code>{location.pathname}</code></h3>
            <Link to={'/'}>Back to Home</Link>
        </div>
    );
}

export default NoMatch;