import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./edit-account.component.css'],
  template: `
    <div class="edit-account-container">
      <div class="edit-account-box">
        <h2 class="edit-account-title">Actualizar Cuenta</h2>
        <form (ngSubmit)="updateAccount()" #accountForm="ngForm" class="edit-account-form">
          
          <!-- Email -->
          <div class="edit-account-form-group">
            <label class="edit-account-label" for="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="email"
              required
              class="edit-account-input"
            />
          </div>

          <!-- Nueva contraseña -->
          <div class="edit-account-form-group">
            <label class="edit-account-label" for="password">Nueva Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="password"
              minlength="6"
              class="edit-account-input"
            />
          </div>

          <!-- Confirmar contraseña -->
          <div class="edit-account-form-group">
            <label class="edit-account-label" for="confirmPassword">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              [(ngModel)]="confirmPassword"
              minlength="6"
              class="edit-account-input"
            />
          </div>

          <!-- ❌ Cartel si las contraseñas no coinciden -->
          <div *ngIf="passwordMismatch" style="margin-top: 20px; text-align: center; color: red;">
            Las contraseñas no coinciden.
          </div>

          <!-- ✅ Cartel si se actualizó correctamente -->
          <div *ngIf="updateSuccess" style="margin-top: 20px; text-align: center; color: green;">
            Los cambios fueron guardados correctamente.
          </div>

          <!-- ❌ Cartel si el email no es correcto -->
          <div *ngIf="emailMismatch" style="margin-top: 20px; text-align: center; color: red;">
            El email no es el correcto.
          </div>

          <!-- Botones -->
          <div class="button-container" style="margin-top: 20px;">
            <button (click)="goBack()" type="button" class="common-button">Volver</button>
            <button type="submit" [disabled]="accountForm.invalid" class="common-button">Actualizar</button>
          </div>
        </form>
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

  updateSuccess: boolean = false;         // <-- Para mostrar mensaje verde
  passwordMismatch: boolean = false;      // <-- Para mostrar error rojo
  emailMismatch: boolean = false;         // <-- Para mostrar error de email

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
    this.updateSuccess = false;
    this.passwordMismatch = false;
    this.emailMismatch = false;

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || currentUser.email !== this.email) {
      this.emailMismatch = true;
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    try {
      if (this.email) {
        await this.authService.updateEmail(this.email);
      }

      if (this.password) {
        await this.authService.updatePassword(this.password);
      }

      this.updateSuccess = true;
    } catch (error: any) {
      console.error('Error al actualizar:', error);
    }
  }
}
