import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA7DA62gHv8ys0n3yW3NRR9tAEUaRgKNfw",
  authDomain: "guess-pokedex.firebaseapp.com",
  projectId: "guess-pokedex",
  storageBucket: "guess-pokedex.appspot.com",
  messagingSenderId: "325915815344",
  appId: "1:325915815344:web:94f0a01dbd72972ecb7a75"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export {auth}
export default db;
