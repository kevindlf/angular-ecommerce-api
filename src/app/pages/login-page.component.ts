import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Iniciar sesión</h2>
    <form (ngSubmit)="login()">
      <input type="email" [(ngModel)]="email" name="loginEmail" placeholder="Email" required>
      <input type="password" [(ngModel)]="password" name="loginPassword" placeholder="Contraseña" required>
      <button type="submit">Iniciar sesión</button>
    </form>
  `
})
export class LoginPageComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      alert('Login exitoso');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  }
}
