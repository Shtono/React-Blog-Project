import { NavLink } from 'react-router-dom';

const ChatLinks = () => {
    return (
        <div className="chat-rooms-navbar">
            <NavLink to="/chatrooms/tech">Tech</NavLink>
            <NavLink to="/chatrooms/JS">JavaScript</NavLink>
            <NavLink to="/chatrooms/react">React</NavLink>
            <NavLink to="/chatrooms/social">Social</NavLink>
        </div>
    );
}

export default ChatLinks;