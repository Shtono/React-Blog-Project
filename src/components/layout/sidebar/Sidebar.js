import '../../../styles/sidebar.css';
import { AuthContext } from '../../../context/auth/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { currentUser, logout } = useContext(AuthContext);


  return currentUser ? (
    <div className="sidebar">
      <ul>
        <Link to="/myprofile">My Profile</Link>
        <Link to="/chatrooms">Chat Rooms</Link>
        <Link to="/users">Find User</Link>
        <Link to="/createPost">Create Post</Link>
        <Link to="/myPosts">My Posts</Link>
        <Link to="/createarticle">Create Article</Link>
        <Link to="#" onClick={logout}>Log Out</Link>
      </ul>
    </div>
  ) :
    (
      <div>

      </div>
    )
}

export default Sidebar;