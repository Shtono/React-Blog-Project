import '../../../styles/sidebar.css';
import { AuthContext } from '../../../context/auth/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../../../context/users/UsersContext';

const Sidebar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { currentUserInfo } = useContext(UsersContext);



  return currentUser ? (
    <div className="sidebar">
      <ul>
        <Link to="/myprofile">My Profile</Link>
        <Link to="/chatrooms">Chat Rooms</Link>
        <Link to="/users">Find User</Link>
        <Link to="/createPost">Create Post</Link>
        <Link to="/myPosts">My Posts</Link>
        {(currentUserInfo && currentUserInfo.isAdmin) && <Link to="/createarticle">Create Article</Link>}
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