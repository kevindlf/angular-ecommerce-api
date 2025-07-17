import { Injectable } from '@angular/core';
import { db } from '../../firebase/firebase';
import { collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  async addUserData(data: any) {
    try {
      const docRef = await addDoc(collection(db, "usuarios"), data);
      return docRef.id;
    } catch (error: any) {
      console.error("Error al agregar datos de usuario:", error.message);
      return null;
    }
  }

  async guardarUsuario(nombre: string, email: string, edad: number) {
    try {
      const data = { nombre, email, edad };
      const docRef = await addDoc(collection(db, "usuarios"), data);
      return docRef.id;
    } catch (error: any) {
      console.error("Error al guardar usuario:", error.message);
      return null;
    }
  }

  async obtenerUsuarioPorEmail(email: string) {
    try {
      const usersRef = collection(db, "usuarios");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      }
      return null;
    } catch (error: any) {
      console.error("Error al obtener usuario:", error.message);
      return null;
    }
  }

  async getUserData(userId: string) {
    try {
      const userDocRef = doc(db, "usuarios", userId);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        return null;
      }
    } catch (error: any) {
      console.error("Error al obtener datos de usuario:", error.message);
      return null;
    }
  }

  async updateUserData(userId: string, data: any) {
    try {
      const userDocRef = doc(db, "usuarios", userId);
      await updateDoc(userDocRef, data);
      console.log("Datos de usuario actualizados");
    } catch (error: any) {
      console.error("Error al actualizar datos de usuario:", error.message);
    }
  }
}