import firebase from 'firebase/app';
// import Firebase Authentication (optional)
import 'firebase/auth';

// import Firebase Realtime Database (optional)
import 'firebase/database';

// import Cloud Firestore (optional)
import 'firebase/firestore';

import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD47TqTAcBjCZTjFa2NPd_igjeqbvyuHpA",
    authDomain: "investabackend.firebaseapp.com",
    projectId: "investabackend",
    storageBucket: "investabackend.appspot.com",
    messagingSenderId: "15880995399",
    appId: "1:15880995399:web:64a0a0226ff939fe142762",
    measurementId: "G-VR52DGMWZY" 
}


const app  = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const firebaseAuth = app.auth();
const firebaseStorage =  app.storage();
const FieldValue = firebase.firestore.FieldValue;
const whereField = firebase.firestore.whereField;
const FieldPath = firebase.firestore.FieldPath;


export{
    whereField,
    app,
    db,
    firebaseAuth,
    firebaseStorage,
    FieldValue,
    FieldPath,
    
  }