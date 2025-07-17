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
    if (this.password !== this.confirmPassword) {
      return;
    }

    try {
      if (this.email) {
        await this.authService.updateEmail(this.email);
      }
    } catch (error: any) {
      // silently ignore errors
    }

    try {
      if (this.password) {
        await this.authService.updatePassword(this.password);
      }
    } catch (error: any) {
      // silently ignore errors
    }
  }
}
