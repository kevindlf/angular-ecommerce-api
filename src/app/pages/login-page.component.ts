import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
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

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  async login() {
    try {
      const user = await this.authService.login(this.email, this.password);
      if (user) {
        const userData = await this.firestoreService.obtenerUsuarioPorEmail(this.email);
        if (userData) {
          // User has an account, redirect to account home
          this.router.navigate(['/account-home']);
        } else {
          // User does not have an account, redirect to user home
          this.router.navigate(['/user-home']);
        }
      }
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  }
}
