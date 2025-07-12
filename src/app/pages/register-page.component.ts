import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Registrarse</h2>
    <form (ngSubmit)="registrar()">
      <input type="text" [(ngModel)]="nombre" name="nombre" placeholder="Nombre" required>
      <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required>
      <input type="password" [(ngModel)]="password" name="password" placeholder="Contraseña" required>
      <input type="number" [(ngModel)]="edad" name="edad" placeholder="Edad" required>
      <button type="submit">Registrarse</button>
    </form>
  `
})
export class RegisterPageComponent {
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
      if (this.nombre && this.edad !== null) {
        await this.firestoreService.guardarUsuario(this.nombre, this.email, this.edad);
      }
      alert('Usuario registrado y datos guardados');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  }
}
