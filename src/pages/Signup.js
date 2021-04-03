import '../styles/signup.css';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/auth/AuthContext';

const Signup = () => {
  const history = useHistory();
  const { setDropdown, signup, githubLogin, facebookLogin } = useContext(AuthContext);
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
        <p>Or login with</p>
        <div className="alt-login">

          <button type="button" onClick={handleFacebookLogin}>
            <i className="fab fa-facebook-f "></i>
            Facebook</button>

          <button type="button" onClick={handleGithubLogin}>
            <i className="fab fa-github "></i>
            Github</button>

        </div>
      </form>
    </div>
  );
}

export default Signup;