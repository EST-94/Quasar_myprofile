// if import error occurs, check here
// - https://firebase.google.com/docs/web/modular-upgrade

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAPzfCxGrv2Kk59JHZLy9ktd2EwtXbDkVQ",
  authDomain: "devitter-2cad3.firebaseapp.com",
  projectId: "devitter-2cad3",
  storageBucket: "devitter-2cad3.appspot.com",
  messagingSenderId: "6397904298",
  appId: "1:6397904298:web:73da21d93870df617c97d3"
}

// Initialize Firebase
if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

let db = firebase.firestore()

export default db
