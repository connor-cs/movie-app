import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import "firebase/auth";
const key = process.env.REACT_APP_FIREBASE_KEY;

const firebaseConfig = {
  apiKey: key,
  authDomain: "movie-app-2c8c9.firebaseapp.com",
  projectId: "movie-app-2c8c9",
  storageBucket: "movie-app-2c8c9.appspot.com",
  messagingSenderId: "47715399572",
  appId: "1:47715399572:web:70290fba6469cc1fafc181",
  measurementId: "G-VQ9PM3Y02R",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
