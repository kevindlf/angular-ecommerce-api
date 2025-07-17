import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: 'Playfair Display', serif;">
      <div style="padding: 20px; max-width: 500px; width: 100%; box-shadow: 0 0 10px rgba(0,0,0,0.1); border-radius: 8px; background-color: white;">
        <h2 style="color: #a67c52; font-size: 2rem;">Actualizar Cuenta</h2>
        <form (ngSubmit)="updateAccount()" #accountForm="ngForm" style="text-align: left;">
          <div style="margin-bottom: 15px;">
            <label for="email" style="display: block; text-align: left; margin-bottom: 5px;">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="email"
              required
              email
              class="edit-account-input"
            />
          </div>

          <div style="margin-bottom: 15px;">
            <label for="password" style="display: block; text-align: left; margin-bottom: 5px;">Nueva Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="password"
              minlength="6"
              class="edit-account-input"
            />
          </div>

          <div style="margin-bottom: 15px;">
            <label for="confirmPassword" style="display: block; text-align: left; margin-bottom: 5px;">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              [(ngModel)]="confirmPassword"
              minlength="6"
              class="edit-account-input"
            />
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <button (click)="goBack()" type="button" class="common-button" style="background-color: #a67c52; border-color: #a67c52; color: white; font-weight: normal; font-family: 'Playfair Display', serif; border-radius: 8px; box-shadow: none;">
              Volver
            </button>
            <button type="submit" [disabled]="accountForm.invalid" class="common-button" style="background-color: #a67c52; border-color: #a67c52; color: white; font-weight: normal; font-family: 'Playfair Display', serif; border-radius: 8px; box-shadow: none;">
              Actualizar
            </button>
          </div>
        </form>

        <div *ngIf="message" style="margin-top: 15px; color: green;">{{ message }}</div>
        <div *ngIf="errorMessage" style="margin-top: 15px; color: red;">{{ errorMessage }}</div>
      </div>
    </div>
  `
})
export class EditAccountComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  message: string = '';
  errorMessage: string = '';

  constructor() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.email) {
      this.email = currentUser.email;
    }
  }

  goBack() {
    this.router.navigate(['/account-management']);
  }

  async updateAccount() {
    this.message = '';
    this.errorMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'La contraseña y la confirmación no coinciden.';
      return;
    }

    try {
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser) {
        this.errorMessage = 'No hay usuario autenticado.';
        return;
      }
      if (this.email) {
        await this.authService.updateEmail(this.email);
      }
      if (this.password) {
        await this.authService.updatePassword(this.password);
        this.message = 'La contraseña fue reemplazada con éxito.';
      }
      this.message = 'Cuenta actualizada con éxito.';
    } catch (error: any) {
      this.errorMessage = 'Error al actualizar la cuenta: ' + error.message;
    }
  }
}
