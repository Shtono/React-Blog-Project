import {
  CLEAR_CURRENT,
  GET_POSTS,
  GET_MORE_POSTS,
  SET_CURRENT,
  FILTER_POSTS,
  CLEAR_FILTER,
  GET_CURRENT_USER_POSTS,
  GET_SINGLE_POST,
  GET_POST_COMMENTS,
  SINGLE_POST_CLEANUP,
  CLEAR_ALL_POSTS,
  SET_NOTIFICATION,
  REMOVE_NOTIFICATION
} from "../types"

export default (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        latestPost: action.payload[4]
      }
    case GET_MORE_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        latestPost: action.payload[4]
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
        singlePost: action.payload,
        singlePostLikes: action.payload.likes
      }
    case GET_POST_COMMENTS:
      return {
        ...state,
        postComments: action.payload,
        singlePostComments: action.payload.length
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
    case SET_NOTIFICATION:
      return {
        ...state,
        postNotification: { ...action.payload }
      }
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        postNotification: null
      }
    default:
      return state
  }
}