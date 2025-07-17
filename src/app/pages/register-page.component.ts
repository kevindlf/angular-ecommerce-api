import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from '../services/firestore.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./shared-styles.css'],
  template: `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: 'Playfair Display', serif;">
      <div style="padding: 20px; max-width: 500px; width: 100%; box-shadow: 0 0 10px rgba(0,0,0,0.1); border-radius: 8px; background-color: white;">
        <h2 style="color: #a67c52; font-size: 2rem;">Registrarse</h2>
        <form (ngSubmit)="registrar()" style="text-align: left;">
          <div style="margin-bottom: 15px;">
            <label for="nombre" style="display: block; margin-bottom: 5px; text-align: left;">Nombre</label>
            <input id="nombre" type="text" [(ngModel)]="nombre" name="nombre" placeholder="Ingrese su nombre" required class="edit-account-input" />
          </div>
          <div style="margin-bottom: 15px;">
            <label for="email" style="display: block; margin-bottom: 5px; text-align: left;">Email</label>
            <input id="email" type="email" [(ngModel)]="email" name="email" placeholder="Ingrese su email" required class="edit-account-input" />
          </div>
          <div style="margin-bottom: 15px;">
            <label for="password" style="display: block; margin-bottom: 5px; text-align: left;">Contraseña</label>
            <input id="password" type="password" [(ngModel)]="password" name="password" placeholder="Ingrese su contraseña" required class="edit-account-input" />
          </div>
          <div style="margin-bottom: 15px;">
            <label for="fechaNacimiento" style="display: block; margin-bottom: 5px; text-align: left;">Fecha de nacimiento</label>
            <input id="fechaNacimiento" type="date" [(ngModel)]="fechaNacimiento" name="fechaNacimiento" required class="edit-account-input" />
          </div>
          <div style="display: flex; justify-content: flex-end; align-items: center;">
            <button type="submit" class="common-button">Registrarse</button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class RegisterPageComponent {
  nombre = '';
  email = '';
  password = '';
  fechaNacimiento: string | null = null;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  private calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  }

  async registrar() {
    try {
      const user = await this.authService.register(this.email, this.password);
      if (this.nombre && this.fechaNacimiento !== null) {
        const edad = this.calcularEdad(this.fechaNacimiento);
        await this.firestoreService.guardarUsuario(this.nombre, this.email, edad);
      }
      alert('Usuario registrado y datos guardados');
    } catch (error: any) {
      alert('Error: ' + error.message);
    }
  }
}
