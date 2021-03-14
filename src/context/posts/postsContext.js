import React, { useReducer, useEffect, useContext, createContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import postReducer from './postsReducer';
import { db } from '../../firebase';
import {
  GET_POSTS,
  GET_CURRENT_USER_POSTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_POSTS,
  CLEAR_FILTER
} from '../types';


export const PostsContext = createContext();

const PostsContextProvider = (props) => {
  const { currentUser } = useContext(AuthContext);

  const initialState = {
    posts: null,
    current: null,
    filtered: null,
    userPosts: null,
    error: null
  }

  const [state, dispatch] = useReducer(postReducer, initialState);

  // Get current user posts 
  useEffect(() => {
    if (state.posts && currentUser) {
      dispatch({ type: GET_CURRENT_USER_POSTS, payload: currentUser.uid })
    }
  }, [currentUser, state.posts])

  // Get posts / real time update
  useEffect(() => {
    const unsubscribe = db.collection('posts')
      .orderBy("date", "desc")
      .onSnapshot(snapshot => {
        let arr = snapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id }
        })
        dispatch({ type: GET_POSTS, payload: arr })
      })
    return unsubscribe
    // eslint-disable-next-line
  }, [])

  // Add post
  const addPost = (post) => {
    db.collection('posts').add(post);
  }


  // Delete post
  const deletePost = async (id) => {
    try {
      await db.collection('posts').doc(id).delete();
    } catch (error) {
      console.log(error);
    }

  }
  // Update post
  const updatePost = (postId, updatedPost) => {
    db.collection('posts').doc(postId).update(updatedPost)
      .catch(err => console.log(err.message))
  }

  // Set current post
  const setCurrent = (post) => {
    dispatch({ type: SET_CURRENT, payload: post })
  }

  // Clear current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Filter posts
  const filterPosts = (filter) => {
    dispatch({ type: FILTER_POSTS, payload: filter })
  }
  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }




  return (
    <PostsContext.Provider value={{
      posts: state.posts,
      current: state.current,
      userPosts: state.userPosts,
      // getPosts,
      addPost,
      deletePost,
      filterPosts,
      clearFilter,
      updatePost,
      setCurrent,
      clearCurrent
    }}>
      {props.children}
    </PostsContext.Provider>
  );
}

export default PostsContextProvider;
