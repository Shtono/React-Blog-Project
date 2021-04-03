import React, { useContext } from 'react';
import { Link, NavLink } from "react-router-dom";
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
        <Link to="/" className="logo">
          Garage
          <span>2021</span>
        </Link>
        <div className='links'>
          <NavLink to='/'>Home</NavLink>
          {currentUser && <NavLink to='/blog'>Blog</NavLink>}
          {currentUser && <NavLink to='/about'>About Us</NavLink>}
          {currentUser && <NavLink to='/contact'>Contact</NavLink>}
          {currentUser && <NavLink to='/login' onClick={signout}>Log Out</NavLink>}
          {!currentUser && <NavLink to='/login'>Login</NavLink>}
          {!currentUser && <NavLink to='/signup'>Sign up</NavLink>}
        </div>
      </div>

    </div >
  );
}

export default Navbar;