import { CLEAR_CURRENT, GET_POSTS, SET_CURRENT, FILTER_POSTS, CLEAR_FILTER, GET_CURRENT_USER_POSTS } from "../types"

export default (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case GET_CURRENT_USER_POSTS:
      return {
        ...state,
        userPosts: state.posts.filter(post => post.uid === action.payload)
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