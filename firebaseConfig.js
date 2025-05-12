// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getReactNativePersistence, initializeAuth } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1aaZBkUZuUyZrYPMF3xHYDJCNuKkGChE",
  authDomain: "mobile-app2-72d57.firebaseapp.com",
  projectId: "mobile-app2-72d57",
  storageBucket: "mobile-app2-72d57.firebasestorage.app",
  messagingSenderId: "370377034605",
  appId: "1:370377034605:web:da36a4fb598d4a3c6fa864"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);

export const usersRef = collection(db, 'users')
