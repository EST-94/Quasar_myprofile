import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAPzfCxGrv2Kk59JHZLy9ktd2EwtXbDkVQ",
  authDomain: "devitter-2cad3.firebaseapp.com",
  projectId: "devitter-2cad3",
  storageBucket: "devitter-2cad3.appspot.com",
  messagingSenderId: "6397904298",
  appId: "1:6397904298:web:73da21d93870df617c97d3"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
// firebase.analytics();

export const auth = firebase.auth();
export const db = firebase.firestore();
