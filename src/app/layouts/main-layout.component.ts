import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav style="padding: 10px; background-color: #f8f9fa; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="background-color: #a67c52; padding: 8px; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
          <img src="assets/logo.png" alt="Logo" style="width: 24px; height: 24px;" />
        </div>
        <span style="font-weight: bold; font-size: 1.2rem; color: #333;">My Home Store</span>
      </div>
      <div style="display: flex; gap: 10px;">
        <a routerLink="/" style="text-decoration: none; padding: 8px 16px; background-color: #a67c52; color: white; border-radius: 4px;">Inicio</a>
        <a routerLink="/register" style="text-decoration: none; padding: 8px 16px; background-color: #a67c52; color: white; border-radius: 4px;">Registrarse</a>
        <a routerLink="/login" style="text-decoration: none; padding: 8px 16px; background-color: #a67c52; color: white; border-radius: 4px;">Iniciar sesión</a>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class MainLayoutComponent {}
