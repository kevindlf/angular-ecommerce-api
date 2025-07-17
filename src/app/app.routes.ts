import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page.component';
import { UserHomeComponent } from './pages/user-home.component';
import { AccountHomeComponent } from './pages/account-home.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { NewProductPageComponent } from './pages/new-product-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'user-home', component: UserHomeComponent },
      { path: 'new-product-page', component: NewProductPageComponent },
    ]
  },
  { path: 'account-home', component: AccountHomeComponent },
  { path: 'account-management', component: AccountManagementComponent },
  { path: 'edit-account', component: EditAccountComponent },
];