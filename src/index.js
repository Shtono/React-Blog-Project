import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthContextProvider from './context/auth/AuthContext'
import PostsContextProvider from './context/posts/PostsContext';
import NewsContextProvider from './context/news/NewsContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostsContextProvider>
        <NewsContextProvider>
          <App />
        </NewsContextProvider>
      </PostsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

