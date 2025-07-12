import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Para Firestore
import { getAuth } from "firebase/auth"; // Para autenticación
// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDtvCoSF_KtWb6HUmRYDNstS5ziPo8FMmo",
    authDomain: "angular-ecommerce-api-1aca0.firebaseapp.com",
    projectId: "angular-ecommerce-api-1aca0",
    storageBucket: "angular-ecommerce-api-1aca0.firebasestorage.app",
    messagingSenderId: "990407467063",
    appId: "1:990407467063:web:8ae7d41935474c68521fb2"
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
// Inicializar Firestore
const db = getFirestore(app);
// Inicializar autenticación
const auth = getAuth(app);
export { app, db, auth };