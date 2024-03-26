// firebase.js
import { initializeApp } from 'firebase/app' // no compat for new SDK
import { getDatabase } from 'firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyB0HtYSFohB6kjCRcVFQcaNpiY7sfkVx3I",
  authDomain: "iscf1-68bf6-deeec.firebaseapp.com",
  databaseURL:
    "https://iscf1-68bf6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iscf1-68bf6",
  storageBucket: "iscf1-68bf6.appspot.com",
  messagingSenderId: "465652692830",
  appId: "1:465652692830:web:f7b35063f7fcb1bd3f81cf",
  measurementId: "G-1LELM9LD55",
};

const app = initializeApp(firebaseConfig)

const database = getDatabase(app)

export default database;
