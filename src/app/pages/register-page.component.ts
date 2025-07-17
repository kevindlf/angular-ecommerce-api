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
    <div class="register-container">
      <h2>Registrarse</h2>
      <form (ngSubmit)="registrar()" class="register-form">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input id="nombre" type="text" [(ngModel)]="nombre" name="nombre" placeholder="Ingrese su nombre" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" [(ngModel)]="email" name="email" placeholder="Ingrese su email" required>
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input id="password" type="password" [(ngModel)]="password" name="password" placeholder="Ingrese su contraseña" required>
        </div>
        <div class="form-group">
          <label for="edad">Edad</label>
          <input id="edad" type="number" [(ngModel)]="edad" name="edad" placeholder="Ingrese su edad" required>
        </div>
        <button type="submit" class="btn-submit">Registrarse</button>
      </form>
    </div>
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
