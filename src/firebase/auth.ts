import { auth } from './firebase'; // Asegurate que './firebase' exporta 'auth'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Registro
const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuario registrado:", userCredential.user);
  } catch (error: any) {
    console.error("Error al registrar:", error.message);
  }
};

// Login
const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuario logueado:", userCredential.user);
  } catch (error: any) {
    console.error("Error al iniciar sesión:", error.message);
  }
};

export { registerUser, loginUser };
