import React, { useReducer, useEffect, useContext, createContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import postReducer from './postsReducer';
import { db } from '../../firebase';
import {
  GET_POSTS,
  GET_MORE_POSTS,
  GET_CURRENT_USER_POSTS,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_POSTS,
  CLEAR_FILTER,
  GET_SINGLE_POST,
  GET_POST_COMMENTS,
  SINGLE_POST_CLEANUP,
  CLEAR_ALL_POSTS
} from '../types';


export const PostsContext = createContext();

const PostsContextProvider = (props) => {
  const { currentUser } = useContext(AuthContext);
  const postsRef = db.collection('posts');

  const initialState = {
    posts: [],
    latestPost: null,
    current: null,
    filtered: null,
    userPosts: null,
    singlePost: null,
    singlePostComments: null,
    singlePostLikes: null,
    postComments: null,
    error: null
  }

  const [state, dispatch] = useReducer(postReducer, initialState);

  // Clear state on Logout
  useEffect(() => {
    if (!currentUser) {
      dispatch({ type: CLEAR_ALL_POSTS })
      console.log('Clear all posts ran');
    }
  }, [currentUser])

  // Real time listener for current User posts
  const realTimeListenerUserPosts = () => {
    const unsubscribe = db.collection('posts')
      .orderBy("createdAt", "desc")
      .where("uid", "==", currentUser.uid)
      .onSnapshot(snapshot => {
        let posts = snapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id }
        })
        dispatch({ type: GET_CURRENT_USER_POSTS, payload: posts })
      })
    return unsubscribe;
  }

  // Get first batch of posts
  const getPosts = () => {
    db.collection('posts')
      .orderBy("createdAt", "desc")
      .limit(5)
      .get()
      .then(snapshot => {
        let posts = snapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id }
        })
        dispatch({ type: GET_POSTS, payload: posts })
      })
      .catch(err => console.log(err.message))
  }

  // Get next batch of posts when user scrolls to the bottom of the page
  const loadNextPage = (post) => {
    if (!post) {
      return
    }
    db.collection('posts')
      .orderBy("createdAt", "desc")
      .startAfter(post.createdAt)
      .limit(5)
      .get()
      .then(snapshot => {
        let posts = snapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id }
        })
        dispatch({ type: GET_MORE_POSTS, payload: posts })
      })
      .catch(err => console.log(err.message))
  }

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

  // Get Post Comments / Real time listener
  const getPostComments = (id) => {
    const unsubscribe = db.collection('comments')
      .where("postId", "==", id)
      .orderBy("createdAt", "desc")
      .onSnapshot(snapshot => {
        let arr = snapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id }
        })
        dispatch({ type: GET_POST_COMMENTS, payload: arr })
      })
    return unsubscribe
  }

  // Add Comment
  const addComment = (comment) => {
    db.collection('comments').add(comment)
      .then(() => console.log('Comment added...'))
      .catch(err => console.log(err))
  }
  // Increase comment count of post
  const addToCommentsCount = (postId) => {
    postsRef.doc(postId).update({ comments: state.singlePostComments + 1 })
  }
  // Increase likes count of post
  const addToLikesCount = (postId) => {
    postsRef.doc(postId).update({
      likes: [...state.singlePostLikes, currentUser.uid],
      likesCount: state.singlePostLikes.length + 1
    })
    console.log('Liked!');
  }

  // Check if current user has liked the post
  const isPostLiked = () => {
    return state.singlePostLikes.includes(currentUser.uid) ? true : false
  }

  // Single post cleanup
  const singlePostCleanup = () => {
    dispatch({ type: SINGLE_POST_CLEANUP })
  }

  return (
    <PostsContext.Provider value={{
      posts: state.posts,
      latestPost: state.latestPost,
      current: state.current,
      filtered: state.filtered,
      userPosts: state.userPosts,
      singlePost: state.singlePost,
      postComments: state.postComments,
      singlePostLikes: state.singlePostLikes,
      getPosts,
      loadNextPage,
      addPost,
      deletePost,
      filterPosts,
      clearFilter,
      updatePost,
      setCurrent,
      clearCurrent,
      getSinglePost,
      getPostComments,
      isPostLiked,
      addComment,
      addToCommentsCount,
      addToLikesCount,
      singlePostCleanup,
      realTimeListenerUserPosts
    }}>
      {props.children}
    </PostsContext.Provider>
  );
}

export default PostsContextProvider;
