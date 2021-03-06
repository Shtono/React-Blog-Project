import React, { createContext, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { auth, db, timestamp } from '../../firebase';
import firebase from 'firebase/app';

export const AuthContext = createContext();

// Create custom Hook
export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthContextProvider = (props) => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [signUpCompleted, setSignUpCompleted] = useState(true);
  const [authNotification, setAuthNotification] = useState(null);

  // Signup with email and password
  const signup = async (email, password, username) => {
    setSignUpCompleted(false)
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      await auth.currentUser.updateProfile({ displayName: username })
      await db.collection('users').doc(auth.currentUser.uid).set({
        username: auth.currentUser.displayName,
        isActive: true,
        regDate: timestamp()
      })
      return setSignUpCompleted(true);
    } catch (err) {
      setDropdown('error', err.message)
    }
  }
  // const signup = async (email, password, username) => {
  //   setSignUpCompleted(false)
  //   try {
  //     await auth.createUserWithEmailAndPassword(email, password)
  //     await auth.currentUser.updateProfile({ displayName: username })
  //     await db.collection('users').doc(auth.currentUser.uid).set({
  //       username: auth.currentUser.displayName,
  //       isActive: true,
  //       regDate: timestamp()
  //     })
  //     setSignUpCompleted(true);
  //   } catch (err) {
  //     setDropdown('error', err.message)
  //   }
  // }

  // Github login
  const githubLogin = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    return auth.signInWithPopup(provider)
      .then(cred => {
        if (cred.additionalUserInfo.isNewUser) {
          const uid = cred.user.uid;
          const username = cred.additionalUserInfo.username;
          const imageUrl = cred.user.photoURL;
          auth.currentUser.updateProfile({ displayName: username })
          db.collection('users').doc(uid).set({
            username,
            imageUrl,
            isActive: true,
            regDate: timestamp()
          })
        } else {
          db.collection('users').doc(cred.user.uid).update({ isActive: true })
        }
      })
  }

  // Facebook login
  const facebookLogin = () => {
    const provider = new firebase.auth.FacebookAuthProvider()
    return auth.signInWithPopup(provider)
      .then(cred => {
        if (cred.additionalUserInfo.isNewUser) {
          const uid = cred.user.uid;
          const username = cred.additionalUserInfo.profile.first_name;
          const name = cred.additionalUserInfo.profile.name;
          auth.currentUser.updateProfile({ displayName: username })
          db.collection('users').doc(uid).set({
            username,
            name,
            isActive: true,
            regDate: timestamp()
          })
        } else {
          db.collection('users').doc(cred.user.uid).update({ isActive: true })
        }
      })
  }

  // Login with email and password
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
      .then((cred) => setDropdown('success', `Welcome back ${cred.user.displayName}`))
  }

  const logout = () => {
    db.collection('users').doc(auth.currentUser.uid).update({ isActive: false })
      .then(() => auth.signOut())
  }

  // Authentication state listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user) {
        db.collection('users')
          .doc(auth.currentUser.uid)
          .update({ isActive: true })
          // An error comes when an user registers for the first time as there is no document in DB to update
          .catch(err => console.log('Ignore this Error:' + err.message))
      }
      setLoading(false);
    })
    return unsubscribe;
  }, [])

  // Set error or success messages
  const setDropdown = (type, message) => {
    setAuthNotification({ type, message })
    setTimeout(() => {
      setAuthNotification(null)
    }, 3000)
  }

  return (
    <AuthContext.Provider value={{
      currentUser,
      signUpCompleted,
      authNotification,
      signup,
      githubLogin,
      facebookLogin,
      login,
      logout,
      setDropdown
    }}>
      {!loading && props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;

