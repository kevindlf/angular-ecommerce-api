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
  styleUrls: ['./login-page.component.css'],
  template: `
    <div class="login-container">
      <h2>Iniciar sesión</h2>
      <form (ngSubmit)="login()" class="login-form">
        <div class="form-group">
          <label for="loginEmail">Email</label>
          <input id="loginEmail" type="email" [(ngModel)]="email" name="loginEmail" placeholder="Ingrese su email" required>
        </div>
        <div class="form-group">
          <label for="loginPassword">Contraseña</label>
          <input id="loginPassword" type="password" [(ngModel)]="password" name="loginPassword" placeholder="Ingrese su contraseña" required>
        </div>
        <button type="submit" class="btn-submit">Iniciar sesión</button>
      </form>
    </div>
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
        } 
      }
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  }
}
