// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtvCoSF_KtWb6HUmRYDNstS5ziPo8FMmo",
  authDomain: "angular-ecommerce-api-1aca0.firebaseapp.com",
  projectId: "angular-ecommerce-api-1aca0",
  storageBucket: "angular-ecommerce-api-1aca0.firebasestorage.app",
  messagingSenderId: "990407467063",
  appId: "1:990407467063:web:8ae7d41935474c68521fb2",
  measurementId: "G-9K1YFWBNMH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db };
export { auth };