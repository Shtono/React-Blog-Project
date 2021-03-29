import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/auth/AuthContext';
// import gmLogo from '../../assets/GM-Logo.png'

const Navbar = () => {
  const { logout, currentUser } = useContext(AuthContext);

  const signout = (e) => {
    logout();
  }
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          Garage
          <span>2021</span>
        </div>
        <div className='links'>
          <Link to='/' className="current">Home</Link>
          {currentUser && <Link to='/blog'>Blog</Link>}
          {currentUser && <Link to='/about'>About Us</Link>}
          {currentUser && <Link to='/contact'>Contact</Link>}
          {currentUser && <Link to='/login' onClick={signout}>Log Out</Link>}
          {!currentUser && <Link to='/login'>Login</Link>}
          {!currentUser && <Link to='/signup'>Sign up</Link>}
        </div>
      </div>

    </div >
  );
}

export default Navbar;