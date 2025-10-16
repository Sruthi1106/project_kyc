import { Routes } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';
import { RegisterKycComponent } from './app/components/register-kyc/register-kyc.component';
import { LoginComponent } from './app/components/login/login.component';
import { UserDashboardComponent } from './app/components/user-dashboard/user-dashboard.component';
import { AdminLoginComponent } from './app/components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './app/components/admin-dashboard/admin-dashboard.component';
import { KycDetailsComponent } from './app/components/kyc-details/kyc-details.component';
import { authGuard } from './app/guards/auth.guard';
import { adminGuard } from './app/guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterKycComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [authGuard] },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: 'admin/user/:id', component: KycDetailsComponent, canActivate: [adminGuard] },
];
