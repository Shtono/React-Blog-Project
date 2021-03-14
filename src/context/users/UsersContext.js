import React, { createContext, useReducer, useEffect } from 'react';
import { db, auth } from '../../firebase';
import usersReducer from './usersReducer';
import { useAuth } from '../auth/AuthContext';
import {
  GET_USERS,
  CLEAR_USERS,
  GET_CURRENT_USER,
  SET_LOADING_TRUE,
  FILTER_USERS
} from '../types';


export const UsersContext = createContext();

const UsersContextProvider = (props) => {
  const { currentUser, signUpCompleted } = useAuth();

  const initialState = {
    users: null,
    currentUserInfo: null,
    filteredUsers: null,
    loading: true
  }

  const [state, dispatch] = useReducer(usersReducer, initialState)

  // Get users
  useEffect(() => {
    const unsubscribe = db.collection('users').onSnapshot(snapshot => {
      let arr = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch({ type: GET_USERS, payload: arr })
    })
    return unsubscribe;
  }, [currentUser])

  useEffect(() => {
    if (currentUser) {
      getUserInfo(currentUser.uid)
    }
  }, [signUpCompleted])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch({ type: SET_LOADING_TRUE })
        getUserInfo(user.uid)
      } else {
        dispatch({ type: CLEAR_USERS })
      }
    })
    return unsubscribe;
  }, [])

  // Get current user info from DB
  const getUserInfo = (id) => {
    db.collection('users').doc(id).get().then(doc => {
      dispatch({ type: GET_CURRENT_USER, payload: doc.data() });
      console.log('userInfo ran')
    }).catch(err => console.log(err.message))
  }

  // Update current user info to DB
  const updateUserInfo = (info) => {
    db.collection('users').doc(currentUser.uid).update(info)
      .then(console.log(`${currentUser.displayName}'s info was successfily updated`))
      .catch(err => console.log(err.message))
    console.log('update called');
  }

  const filterUsers = (filter) => {
    dispatch({ type: FILTER_USERS, payload: filter })
  }

  return (
    <UsersContext.Provider value={{
      users: state.users,
      currentUserInfo: state.currentUserInfo,
      filteredUsers: state.filteredUsers,
      updateUserInfo,
      filterUsers
    }}>
      {!state.loading && props.children}
    </UsersContext.Provider>
  )
}

export default UsersContextProvider;
