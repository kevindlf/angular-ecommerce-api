// src/app/components/user-form/user-form.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  nombre = '';
  email = '';
  password = '';
  edad: number | null = null;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  async registrar() {
    try {
      const user = await this.authService.register(this.email, this.password);
      // Guardar datos adicionales en Firestore
      if (this.nombre && this.edad !== null) {
        await this.firestoreService.guardarUsuario(this.nombre, this.email, this.edad);
      }
      alert('Usuario registrado y datos guardados');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  }

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      alert('Login exitoso');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  }
}
