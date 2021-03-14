import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/auth/AuthContext';

const Navbar = () => {
  const { logout, currentUser } = useContext(AuthContext);

  const handleClick = () => {
    const links = document.querySelector('.links');
    if (links.classList.contains('open')) {
      links.classList.remove('open')
      links.classList.add('close')
    } else {
      links.classList.add('open')
      links.classList.remove('close')
    }
  }

  const handleCurrentPage = (e) => {
    const links = document.querySelectorAll('.links a');
    links.forEach(link => {
      link.classList.remove('current')
    });
    e.target.classList.add('current')
  }

  const closeBar = () => {
    const links = document.querySelector('.links');
    links.classList.remove('open')
    links.classList.add('close')
  }

  const signout = (e) => {
    logout();
  }
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <span>G</span>
          <span>a</span>
          <span>r</span>
          <span>a</span>
          <span>g</span>
          <span>e</span>
          <span>2021</span>
        </div>
        <button onClick={handleClick}>
          <div></div>
          <div></div>
          <div></div>
        </button>
        <div className='links' onClick={closeBar}>
          {currentUser && <Link to='/' className="current" onClick={handleCurrentPage}>Home</Link>}
          {currentUser && <Link to='/blog' onClick={handleCurrentPage}>Blog</Link>}
          {currentUser && <Link to='/about' onClick={handleCurrentPage}>About Us</Link>}
          {currentUser && <Link to='/contact' onClick={handleCurrentPage}>Contact</Link>}
          {currentUser && <Link to='/login' onClick={signout}>Log Out</Link>}
          {!currentUser && <Link to='/login' onClick={handleCurrentPage}>Login</Link>}
          {!currentUser && <Link to='/signup' onClick={handleCurrentPage}>Sign up</Link>}
        </div>
      </div>

    </div >
  );
}

export default Navbar;