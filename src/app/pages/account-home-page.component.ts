import { Component } from '@angular/core';
import { AccountProductListComponent } from '../components/product-list/account-product-list.component';

@Component({
  selector: 'app-account-home-page',
  standalone: true,
  imports: [AccountProductListComponent],
  template: `
    <app-account-product-list></app-account-product-list>
  `
})
export class AccountHomePageComponent {}
