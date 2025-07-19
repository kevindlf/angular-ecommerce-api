import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-management',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./account-management.component.css'],
  template: `
    <div class="container">
      <div class="content-box">
        <h2>Administrar Cuenta</h2>
        <div>
        <button (click)="goBack()" class="common-button">Volver</button>
        <button (click)="deleteAccount()" class="common-button delete-button">Eliminar Cuenta</button>
        <button (click)="editAccount()" class="common-button">Editar Cuenta</button>
        </div>
      </div>
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
          const password = prompt('Por favor, ingrese su contraseña para confirmar la eliminación de la cuenta:');
          if (!password) {
            alert('La eliminación de la cuenta fue cancelada. No se ingresó contraseña.');
            return;
          }
          const credential = (await import('firebase/auth')).EmailAuthProvider.credential(
            user.email || '',
            password
          );
          await (await import('firebase/auth')).reauthenticateWithCredential(user, credential);
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
    this.router.navigate(['/account']);
  }
}
