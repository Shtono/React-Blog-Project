import '../styles/login.css';
import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

const Login = () => {
  const { login, setDropdown, githubLogin, facebookLogin } = useContext(AuthContext)
  const [user, setUser] = useState({ email: '', password: '' })
  const { email, password } = user;
  const history = useHistory();

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      history.push('/')
    } catch (err) {
      setDropdown('error', err.message)
    } finally {
      history.push('/')
    }
  }

  const handleGithubLogin = async () => {
    try {
      await githubLogin();
      history.push('/')
    } catch (err) {
      setDropdown(err.message)
    }
  }
  const handleFacebookLogin = async () => {
    try {
      await facebookLogin();
      history.push('/')
    } catch (err) {
      setDropdown(err.message)
    }
  }

  return (
    <div className="login">
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <div className="input">
          <i className="fas fa-user fa-2x"></i>
          <input type="text" name="email" value={email} onChange={onChange} placeholder="Email" autoFocus />
        </div>
        <div className="input">
          <i className="fas fa-lock fa-2x"></i>
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" />
        </div>
        <p><a href="#">Forgot password?</a></p>
        <button type="submit">Login</button>
        <p>Or login with</p>
        <div className="alt-login">

          <button type="button" onClick={handleFacebookLogin}>
            <i className="fab fa-facebook-f "></i>
            Facebook</button>

          <button type="button" onClick={handleGithubLogin}>
            <i className="fab fa-github "></i>
            Github</button>

        </div>
        <p>Don't have an account? <Link to='/signup'>Signup Now</Link></p>
      </form>

    </div>
  );
}

export default Login;