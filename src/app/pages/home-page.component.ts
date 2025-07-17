import { Component } from '@angular/core';
import { ProductListComponent } from '../components/product-list/product-list.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductListComponent],
  template: `
  
    <app-product-list></app-product-list>
  `
})
export class HomePageComponent {}
