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
      console.log(err.message);
    }
  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

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

  return (
    <AuthContext.Provider value={{
      currentUser,
      signUpCompleted,
      signup,
      login,
      logout,
    }}>
      {!loading && props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;

