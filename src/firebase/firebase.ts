// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9nCAotx2uVX6Uyz8Qq8LPmm0_iY-Ikj8",
  authDomain: "angular-ecommerce-api-e42be.firebaseapp.com",
  projectId: "angular-ecommerce-api-e42be",
  storageBucket: "angular-ecommerce-api-e42be.firebasestorage.app",
  messagingSenderId: "921805025341",
  appId: "1:921805025341:web:259af19d5ec70ca286fa54",
  measurementId: "G-HHDS2JQXTG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db };
export { auth };