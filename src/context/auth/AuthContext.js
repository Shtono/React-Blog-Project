import React, { createContext, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../../firebase';

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

  const signup = async (email, password, username) => {
    setSignUpCompleted(false)
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      await auth.currentUser.updateProfile({ displayName: username })
      await db.collection('users').doc(auth.currentUser.uid).set({
        username: auth.currentUser.displayName,
        isActive: true
      })
      setSignUpCompleted(true);
      history.push('/')
    } catch (err) {
      setDropdown('error', err.message)
    }
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
      .then((cred) => setDropdown('success', `Welcome back ${cred.user.displayName}`))
  }
  // setDropdown('success', 'Logged out.See you soon ;)')
  const logout = async () => {
    await db.collection('users').doc(auth.currentUser.uid).update({ isActive: false })
    return auth.signOut()
  }

  // Authentication state listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      if (user) {
        db.collection('users').doc(auth.currentUser.uid).update({ isActive: true })
      }
      setLoading(false);
    })
    return unsubscribe;
  }, [])

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
      login,
      logout,
      setDropdown
    }}>
      {!loading && props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;

