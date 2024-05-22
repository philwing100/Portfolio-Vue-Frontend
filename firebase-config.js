// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import {getAuth, GoogleAuthProvider} from 'firebase/auth'

//https://www.youtube.com/watch?v=zL0dKETbCNE

const firebaseConfig = {
  apiKey: "AIzaSyCHgoH9FW6h4mLPwtoUo8MspUdMOm4k6QU",
  authDomain: "productivitydbms.firebaseapp.com",
  projectId: "productivitydbms",
  storageBucket: "productivitydbms.appspot.com",
  messagingSenderId: "338445366581",
  appId: "1:338445366581:web:2c3b5b72ec5b91055f487c",
  measurementId: "G-1ZRGBZ4P8D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

