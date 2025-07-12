import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterPageComponent } from './pages/register-page.component';
import { LoginPageComponent } from './pages/login-page.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
];
