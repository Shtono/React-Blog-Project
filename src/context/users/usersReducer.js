import {
  GET_USERS,
  CLEAR_USERS,
  GET_CURRENT_USER,
  SET_LOADING_TRUE,
  FILTER_USERS,
  GET_SINGLE_USER,
  CLEAR_SINGLE_USER,
  SET_NOTIFICATION,
  REMOVE_NOTIFICATION
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUserInfo: action.payload,
        loading: false
      }
    case FILTER_USERS:
      return {
        ...state,
        filteredUsers: state.users.filter(user => {
          return user.username.toLowerCase().includes(action.payload.toLowerCase())
        })
      }
    case GET_SINGLE_USER:
      return {
        ...state,
        singleUser: action.payload
      }
    case CLEAR_SINGLE_USER:
      return {
        ...state,
        singleUser: null
      }
    case CLEAR_USERS:
      return {
        ...state,
        users: null,
        currentUserInfo: null,
        loading: false
      }
    case SET_LOADING_TRUE:
      return {
        ...state,
        loading: true
      }
    case SET_NOTIFICATION:
      return {
        ...state,
        userNotification: action.payload
      }
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        userNotification: null
      }
    default:
      return state
  }
}