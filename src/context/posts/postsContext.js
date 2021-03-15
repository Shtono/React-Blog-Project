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
  CLEAR_FILTER,
  GET_SINGLE_POST,
  GET_POST_COMMENTS,
  POST_CLEANUP
} from '../types';


export const PostsContext = createContext();

const PostsContextProvider = (props) => {
  const { currentUser } = useContext(AuthContext);

  const initialState = {
    posts: null,
    current: null,
    filtered: null,
    userPosts: null,
    singlePost: null,
    postComments: null,
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
    db.collection('posts').add(post)
      .then(console.log('post added...'))
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
    console.log(filter)
    dispatch({ type: FILTER_POSTS, payload: filter })
  }
  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  // Get SinglePost
  const getSinglePost = (id) => {
    db.collection('posts')
      .doc(id)
      .get()
      .then(doc => dispatch({ type: GET_SINGLE_POST, payload: doc.data() }))
      .catch(err => console.log(err.message))
  }
  // Get Post Comments
  const getPostComments = (id) => {
    const unsubscribe = db.collection('comments')
      .where("postId", "==", id)
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        let arr = snapshot.docs.map(doc => doc.data())
        dispatch({ type: GET_POST_COMMENTS, payload: arr })
      })
    return unsubscribe;
  }

  // Add Comment
  const addComment = (comment) => {
    db.collection('comments').add(comment)
      .then(() => console.log('Comment added...'))
      .catch(err => console.log(err))
  }

  // Single post cleanup
  const singlePostCleanup = () => {
    dispatch({ type: POST_CLEANUP })
  }



  return (
    <PostsContext.Provider value={{
      posts: state.posts,
      current: state.current,
      userPosts: state.userPosts,
      filtered: state.filtered,
      singlePost: state.singlePost,
      postComments: state.postComments,
      addPost,
      deletePost,
      filterPosts,
      clearFilter,
      updatePost,
      setCurrent,
      clearCurrent,
      getSinglePost,
      getPostComments,
      addComment,
      singlePostCleanup
    }}>
      {props.children}
    </PostsContext.Provider>
  );
}

export default PostsContextProvider;
