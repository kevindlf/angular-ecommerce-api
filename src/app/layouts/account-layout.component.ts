import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account-layout',
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
      <div style="display: flex; gap: 10px; align-items: center;">
        <a
          title="Carrito de compras"
          aria-label="Carrito de compras"
          routerLink="/cart-management"
          class="common-button"
          style="padding: 8px 12px; border-radius: 4px; cursor: pointer; background-color: #a67c52; color: white; border: none; display: inline-flex; align-items: center; text-decoration: none; margin-right: 8px;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 6px;">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Carrito
        </a>
        <a
          title="Administrar cuenta"
          aria-label="Administrar cuenta"
          routerLink="/account-management"
          class="common-button"
          style="padding: 8px 12px; border-radius: 4px; cursor: pointer; background-color: #a67c52; color: white; border: none; display: inline-flex; align-items: center; text-decoration: none;">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 6px;">
            <circle cx="12" cy="8" r="4" stroke="white" stroke-width="2"/>
            <path d="M4 20c0-4 8-4 8-4s8 0 8 4" stroke="white" stroke-width="2"/>
          </svg>
          Administrar cuenta
        </a>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AccountLayoutComponent {}
