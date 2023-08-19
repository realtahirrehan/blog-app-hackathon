import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import {getAuth  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5Y1a8NUFEZNgnOseOgI6ps5V4cY4LKVc",
  authDomain: "buoyant-genre-390818.firebaseapp.com",
  projectId: "buoyant-genre-390818",
  storageBucket: "buoyant-genre-390818.appspot.com",
  messagingSenderId: "147122883644",
  appId: "1:147122883644:web:fc34fa940a221d4ec6c739",
  measurementId: "G-8XBLW3B6RR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);