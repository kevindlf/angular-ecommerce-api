import { Component } from '@angular/core';

@Component({
  selector: 'app-user-home',
  standalone: true,
  template: `
    <h2>Bienvenido, usuario</h2>
    <div>
      <button title="Administrar cuenta" aria-label="Administrar cuenta">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="8" r="4" stroke="black" stroke-width="2"/>
          <path d="M4 20c0-4 8-4 8-4s8 0 8 4" stroke="black" stroke-width="2"/>
        </svg>
        Administrar cuenta
      </button>
    </div>
  `
})
export class UserHomeComponent {}
