import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page.component';
import { UserHomeComponent } from './pages/user-home.component';
import { AccountHomeComponent } from './pages/account-home.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { AccountManagementComponent } from './pages/account-management.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { EditAccountComponent } from './pages/edit-account.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'user-home', component: UserHomeComponent },
      { path: 'login', component: LoginPageComponent },
    ]
  },
  { path: 'account-home', component: AccountHomeComponent },
  { path: 'account-management', component: AccountManagementComponent },
  { path: 'edit-account', component: EditAccountComponent },
];