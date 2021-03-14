import '../../../styles/sidebar.css';
import { AuthContext } from '../../../context/auth/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { currentUser, logout } = useContext(AuthContext);


  return currentUser ? (
    <div className="sidebar">
      <ul>
        <Link to="/user/myprofile">My Profile</Link>
        <Link to="/user/chatrooms">Chat Rooms</Link>
        <Link to="/user/searchUsers">Find User</Link>
        <Link to="/user/createPost">Create Post</Link>
        <Link to="/user/myPosts">My Posts</Link>
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