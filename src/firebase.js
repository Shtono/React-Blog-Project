import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const app = firebase.initializeApp({
  apiKey: "AIzaSyBEpsDY681NK2JBSmYpT2IP54hRrFknY4A",
  authDomain: "my-blog-project-a3d62.firebaseapp.com",
  projectId: "my-blog-project-a3d62",
  storageBucket: "my-blog-project-a3d62.appspot.com",
  messagingSenderId: "970378935031",
  appId: "1:970378935031:web:be6003144f5f89231871f2"
})
// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// })

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const db = app.firestore()
export const auth = app.auth()
// export default app
