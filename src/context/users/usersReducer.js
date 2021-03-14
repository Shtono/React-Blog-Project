import { GET_USERS, CLEAR_USERS, GET_CURRENT_USER, SET_LOADING_TRUE, FILTER_USERS } from '../types';

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
  }

}