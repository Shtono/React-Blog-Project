import { Link } from 'react-router-dom';

const ChatLinks = () => {
    return (
        <div style={barStyle}>
            <Link to="/chatrooms/tech">Tech</Link>
            <Link to="/chatrooms/JS">JavaScript</Link>
            <Link to="/chatrooms/react">React</Link>
            <Link to="/chatrooms/social">Social</Link>
        </div>
    );
}

export default ChatLinks;

const barStyle = {
    width: '800px',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '25px',
    marginTop: '25px',
    backgroundColor: '#dff',
    padding: '10px 20px'
}