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
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: 'Playfair Display', serif;">
      <div style="padding: 20px; max-width: 500px; width: 100%; box-shadow: 0 0 10px rgba(0,0,0,0.1); border-radius: 8px; background-color: white;">
        <h2 style="color: #525151; font-size: 2rem; text-align: center;">Iniciar sesión</h2>
        <form (ngSubmit)="login()" #loginForm="ngForm" style="text-align: left;">
          <div style="margin-bottom: 15px;">
            <label for="loginEmail" style="display: block; text-align: left; margin-bottom: 5px;">Email</label>
            <input id="loginEmail" type="email" [(ngModel)]="email" name="loginEmail" placeholder="Ingrese su email" required class="edit-account-input" />
          </div>
          <div style="margin-bottom: 15px;">
            <label for="loginPassword" style="display: block; text-align: left; margin-bottom: 5px;">Contraseña</label>
            <input id="loginPassword" type="password" [(ngModel)]="password" name="loginPassword" placeholder="Ingrese su contraseña" required class="edit-account-input" />
          </div>

          <!-- Botones -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
            <button type="button" class="common-button" (click)="volver()">Volver</button>
            <button type="submit" class="common-button" [disabled]="loginForm.invalid">Iniciar sesión</button>
          </div>

        </form>
      </div>
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
          this.router.navigate(['/account']);
        }
      }
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
