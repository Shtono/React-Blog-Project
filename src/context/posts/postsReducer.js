import {
  CLEAR_CURRENT,
  GET_POSTS,
  SET_CURRENT,
  FILTER_POSTS,
  CLEAR_FILTER,
  GET_CURRENT_USER_POSTS,
  GET_SINGLE_POST,
  GET_POST_COMMENTS,
  SINGLE_POST_CLEANUP,
  CLEAR_ALL_POSTS
} from "../types"

export default (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case CLEAR_ALL_POSTS:
      return {
        ...state,
        posts: null,
        userPosts: null
      }
    case GET_CURRENT_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload
      }
    case GET_SINGLE_POST:
      return {
        ...state,
        singlePost: action.payload
      }
    case GET_POST_COMMENTS:
      return {
        ...state,
        postComments: action.payload
      }
    case SINGLE_POST_CLEANUP:
      return {
        ...state,
        singlePost: null,
        postComments: null
      }
    case FILTER_POSTS:
      return {
        ...state,
        filtered: state.posts.filter(post => {
          return post.title.toLowerCase().includes(action.payload.toLowerCase())
        })
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    default:
      return state
  }
}