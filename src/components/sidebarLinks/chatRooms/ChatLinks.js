import { Link } from 'react-router-dom';

const ChatLinks = () => {
    return (
        <div>
            <Link to="/chatrooms/tech">Tech</Link>
            <Link to="/chatrooms/JS">JavaScript</Link>
            <Link to="/chatrooms/react">React</Link>
            <Link to="/chatrooms/social">Social</Link>
        </div>
    );
}

export default ChatLinks;