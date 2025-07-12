import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Para Firestore
import { getAuth } from "firebase/auth"; // Para autenticación
// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA9nCAotx2uVX6Uyz8Qq8LPmm0_iY-Ikj8",
  authDomain: "angular-ecommerce-api-e42be.firebaseapp.com",
  projectId: "angular-ecommerce-api-e42be",
  storageBucket: "angular-ecommerce-api-e42be.firebasestorage.app",
  messagingSenderId: "921805025341",
  appId: "1:921805025341:web:259af19d5ec70ca286fa54",
  measurementId: "G-HHDS2JQXTG"
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
// Inicializar Firestore
const db = getFirestore(app);
// Inicializar autenticación
const auth = getAuth(app);
export { app, db, auth };