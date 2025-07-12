import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav style="padding: 10px; background-color: #f8f9fa; display: flex; gap: 10px; justify-content: flex-end;">
      <a routerLink="/" style="text-decoration: none; padding: 8px 16px; background-color: #6b4c2a; color: white; border-radius: 4px;">Inicio</a>
      <a routerLink="/register" style="text-decoration: none; padding: 8px 16px; background-color: #a67c52; color: white; border-radius: 4px;">Registrarse</a>
      <a routerLink="/login" style="text-decoration: none; padding: 8px 16px; background-color: #8c6239; color: white; border-radius: 4px;">Iniciar sesión</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class MainLayoutComponent {}
