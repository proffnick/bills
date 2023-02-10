import * as firebase from "firebase/app";
import * as Auth from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";

//NEXT_PUBLIC_
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY || `test`,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || `test`,
    databaseURL: process.env.FIREBASE_DATABASE_URL || process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || `test`,
    projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || `test`,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `test`,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || `test`,
    appId: process.env.FIREBASE_APP_ID || process.env.NEXT_PUBLIC_FIREBASE_APP_ID || `test`,
};

const app   = firebase.initializeApp(firebaseConfig);
const auth  = Auth.getAuth(app);
const provider  = new Auth.GoogleAuthProvider();
const db    = getFirestore(app);

export {
  auth,
  Auth,
  db,
  firebase,
  provider
};
