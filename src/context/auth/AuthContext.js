import React, { createContext, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../../firebase';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext)
}


export default function AuthContextProvider(props) {
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
        username: auth.currentUser.displayName
      }
      )
      setSignUpCompleted(true);
      history.push('/')
    } catch (err) {
      console.log(err);
    }

  }

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const logout = () => {
    auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    })
    return unsubscribe
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

