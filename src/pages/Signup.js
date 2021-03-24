import { useState, useContext } from 'react';
import '../styles/signup.css';
import { AuthContext } from '../context/auth/AuthContext';

const Signup = () => {
  const { signup, githubLogin } = useContext(AuthContext);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  })
  const { username, email, password, password2 } = newUser;

  // Set new user
  const onChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  // Handle Password
  const handlePassword = (e) => {
    setNewUser({ ...newUser, password2: e.target.value })
    if (e.target.value !== password) {
      e.target.classList.remove('correct');
      e.target.classList.add('incorrect');
    } else {
      e.target.classList.remove('incorrect');
      e.target.classList.add('correct');
    }
  }

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === password2) {
      signup(email, password, username)
      e.target.password2.classList.remove('correct')
      e.target.password2.classList.remove('incorrect')
    } else {
      console.log('try again');
    }

  }

  return (
    <div className="signup">
      <form id='form' onSubmit={handleSubmit}>
        <h1>Sign Up Today</h1>
        <input type="text"
          name="username"
          placeholder="Username"
          required
          autoFocus
          value={username}
          onChange={onChange}
        />
        <input type="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="password"
          name="password2"
          placeholder="Repeat password"
          value={password2}
          onChange={handlePassword}
          required />
        <button type="submit">Sign Up</button>
        <div className="alt-login">
          <a href="#"><i className="fab fa-facebook-f "></i>Facebook</a>
          <button type="button" onClick={githubLogin}>Github Login</button>
          {/* <a href="#"><i className="fab fa-instagram"></i>Instagram</a> */}
        </div>
      </form>
    </div>
  );
}

export default Signup;