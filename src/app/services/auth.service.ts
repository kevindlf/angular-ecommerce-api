import { Injectable } from '@angular/core';
import { auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePassword as firebaseUpdatePassword, updateEmail as firebaseUpdateEmail } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  getCurrentUser() {
    return auth.currentUser;
  }

  async updatePassword(newPassword: string) {
    const user = auth.currentUser;
    if (user) {
      await firebaseUpdatePassword(user, newPassword);
    } else {
      throw new Error('No hay usuario autenticado');
    }
  }

  async updateEmail(newEmail: string) {
    const user = auth.currentUser;
    if (user) {
      await firebaseUpdateEmail(user, newEmail);
    } else {
      throw new Error('No hay usuario autenticado');
    }
  }
}
