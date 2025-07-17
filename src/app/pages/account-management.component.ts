import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px;">
      <h2>Administrar Cuenta</h2>
      <button (click)="editAccount()" class="common-button" style="margin: 10px;">Editar Cuenta</button>
      <button (click)="deleteAccount()" class="common-button" style="margin: 10px; background-color: #d9534f;">Eliminar Cuenta</button>
      <button (click)="goBack()" class="common-button" style="margin: 10px;">Volver</button>
    </div>
  `
})
export class AccountManagementComponent {
  private router = inject(Router);

  editAccount() {
    this.router.navigate(['/edit-account']);
  }

  async deleteAccount() {
    const confirmed = confirm('¿Está seguro que desea eliminar su cuenta? Esta acción no se puede deshacer.');
    if (confirmed) {
      try {
        const firebaseAuth = (await import('firebase/auth')).getAuth();
        const user = firebaseAuth.currentUser;
        if (user) {
          await (await import('firebase/auth')).deleteUser(user);
          alert('Su cuenta fue eliminada con éxito');
          this.router.navigate(['/login']);
        } else {
          alert('No hay usuario autenticado');
        }
      } catch (error: any) {
        alert('Error al eliminar cuenta: ' + error.message);
      }
    }
  }

  goBack() {
    this.router.navigate(['/account-home']);
  }
}
