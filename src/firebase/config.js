import { getFirestore } from "firebase/firestore";
import {initializeApp} from 'firebase/app'
import "firebase/compat/firestore"; // Import Firestore
import 'firebase/storage'
import firebase from "firebase/compat/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0-g18-qVPXMC6hRUGbUYmx5snMsDx9zQ",
  authDomain: "olxapp-2c998.firebaseapp.com",
  projectId: "olxapp-2c998",
  storageBucket: "olxapp-2c998.appspot.com",
  messagingSenderId: "230951336223",
  appId: "1:230951336223:web:446ed35d53ef2403e5182a",
  measurementId: "G-LWC636V0DX"
};

// Initialize Firebase
const app =  initializeApp(firebaseConfig);
const db = getFirestore(app)
// const auth = firebase.auth()

export default app
