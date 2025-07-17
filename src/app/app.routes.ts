import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page.component';
import { HomePageComponent } from './pages/home-page.component';
import { AccountHomeComponent } from './pages/account-home.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { AccountManagementComponent } from './pages/account-management.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NewProductPageComponent } from './pages/new-product-page.component';
import { EditAccountComponent } from './pages/edit-account.component';
import { RegisterPageComponent } from './pages/register-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'home-page', component: HomePageComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'register-page', component: RegisterPageComponent },
      { path: 'new-product-page', component: NewProductPageComponent },
    ]
  },
  { path: 'account-home', component: AccountHomeComponent },
  { path: 'account-management', component: AccountManagementComponent },
  { path: 'edit-account', component: EditAccountComponent },
];
