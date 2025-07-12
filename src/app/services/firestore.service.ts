// src/app/services/firestore.service.ts

import { Injectable } from '@angular/core';
import { db } from '../../firebase/firebase'; // ajustá el path si está en otro lado
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor() {}

  async guardarUsuario(nombre: string, email: string, edad: number) {
    try {
      const docRef = await addDoc(collection(db, "usuarios"), {
        nombre,
        email,
        edad
      });
      console.log("Usuario guardado con ID:", docRef.id);
    } catch (error: any) {
      console.error("Error al guardar usuario:", error.message);
    }
  }

  async obtenerUsuarioPorEmail(email: string) {
    try {
      const usuariosRef = collection(db, "usuarios");
      const q = query(usuariosRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      } else {
        return null;
      }
    } catch (error: any) {
      console.error("Error al obtener usuario:", error.message);
      return null;
    }
  }
}
