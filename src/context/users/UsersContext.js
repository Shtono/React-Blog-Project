import React, { createContext, useReducer, useEffect } from 'react';
import { db, auth } from '../../firebase';
import usersReducer from './usersReducer';
import { useAuth } from '../auth/AuthContext';
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


export const UsersContext = createContext();

const UsersContextProvider = (props) => {
  const { currentUser, signUpCompleted } = useAuth();

  const initialState = {
    users: null,
    currentUserInfo: null,
    filteredUsers: null,
    singleUser: null,
    userNotification: null,
    loading: true
  }

  const [state, dispatch] = useReducer(usersReducer, initialState)

  // Get user info after signup
  useEffect(() => {
    if (currentUser) {
      getUserInfo(currentUser.uid)
    }
  }, [signUpCompleted])

  // Get current user info when log in / Clear State when log out
  useEffect(() => {
    if (currentUser) {
      dispatch({ type: SET_LOADING_TRUE })
      getUserInfo(currentUser.uid)
    } else {
      dispatch({ type: CLEAR_USERS })
    }
  }, [currentUser])

  // Get users from DB / Real time listener 
  const getUsers = () => {
    const unsubscribe = db.collection('users').onSnapshot(snapshot => {
      let arr = snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
      dispatch({ type: GET_USERS, payload: arr })
    })
    return unsubscribe;
  }

  // Get current user info from DB
  const getUserInfo = (id) => {
    db.collection('users').doc(id).get().then(doc => {
      dispatch({ type: GET_CURRENT_USER, payload: doc.data() });
    }).catch(err => setDropdown('error', err.message))
  }

  // Update current user info to DB
  const updateUserInfo = (info) => {
    db.collection('users').doc(currentUser.uid).update(info)
      .then(setDropdown('success', 'Profile Updated'))
      .catch(err => setDropdown('error', err.message))
  }

  // Filter users
  const filterUsers = (filter) => {
    dispatch({ type: FILTER_USERS, payload: filter })
  }

  // Get Single User
  const getSingleUser = (userId) => {
    db.collection('users').doc(userId).get()
      .then(doc => dispatch({ type: GET_SINGLE_USER, payload: doc.data() }))
      .catch(err => setDropdown('error', err.message))
  }

  // Clear Single User
  const clearSingleUser = () => {
    dispatch({ type: CLEAR_SINGLE_USER })
  }

  const setDropdown = (type, message) => {
    dispatch({ type: SET_NOTIFICATION, payload: { type, message } })
    setTimeout(() => {
      dispatch({ type: REMOVE_NOTIFICATION })
    }, 3000)
  }

  return (
    <UsersContext.Provider value={{
      users: state.users,
      currentUserInfo: state.currentUserInfo,
      filteredUsers: state.filteredUsers,
      singleUser: state.singleUser,
      userNotification: state.userNotification,
      getUsers,
      getUserInfo,
      updateUserInfo,
      filterUsers,
      getSingleUser,
      clearSingleUser,
      setDropdown
    }}>
      {!state.loading && props.children}
    </UsersContext.Provider>
  )
}

export default UsersContextProvider;
