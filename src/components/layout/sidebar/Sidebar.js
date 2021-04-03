// import '../../../styles/sidebar.css';
import { AuthContext } from '../../../context/auth/AuthContext';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UsersContext } from '../../../context/users/UsersContext';

const Sidebar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const { currentUserInfo } = useContext(UsersContext);



  return currentUser ? (
    <div className="sidebar">
      <ul>
        <NavLink to="/myprofile">My Profile</NavLink>
        <NavLink to="/chatrooms">Chat Rooms</NavLink>
        <NavLink to="/users">Find User</NavLink>
        <NavLink to="/createPost">Create Post</NavLink>
        <NavLink to="/myPosts">My Posts</NavLink>
        {(currentUserInfo && currentUserInfo.isAdmin) && <NavLink to="/createarticle">Create Article</NavLink>}
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