import { Component } from '@angular/core';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-home',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  template: `
    <div style="position: relative;">
      <app-product-list></app-product-list>
      <button 
        title="Administrar cuenta" 
        aria-label="Administrar cuenta" 
        style="position: absolute; top: 10px; right: 10px; z-index: 1000; padding: 8px 12px; background-color: #a67c52; color: white; border: none; border-radius: 4px; cursor: pointer;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle; margin-right: 6px;">
          <circle cx="12" cy="8" r="4" stroke="white" stroke-width="2"/>
          <path d="M4 20c0-4 8-4 8-4s8 0 8 4" stroke="white" stroke-width="2"/>
        </svg>
        Administrar cuenta
      </button>
    </div>
  `
})
export class AccountHomeComponent {}
