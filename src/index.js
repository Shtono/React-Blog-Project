import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthContextProvider from './context/auth/AuthContext'
import PostsContextProvider from './context/posts/PostsContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostsContextProvider>
        <App />
      </PostsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

