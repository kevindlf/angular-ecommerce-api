import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterPageComponent } from './pages/register-page.component';
import { LoginPageComponent } from './pages/login-page.component';
import { UserHomeComponent } from './pages/user-home.component';
import { AccountHomeComponent } from './pages/account-home.component';
import { MainLayoutComponent } from './layouts/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ProductListComponent },
      { path: 'register', component: RegisterPageComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'user-home', component: UserHomeComponent },
    ]
  },
  { path: 'account-home', component: AccountHomeComponent },
];
