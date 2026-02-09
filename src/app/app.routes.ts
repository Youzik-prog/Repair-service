import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard, guestGuard } from './core/auth.guard';
import { App } from './app';
import { FormComponent } from './components/form/form.component';
import { BaseTableService } from './services/base-table.service';
import { UsersService } from './services/users.service';
import { SignupComponent } from './components/signup/signup.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

export const routes: Routes = [
    {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
  },

  {
    path: '',
    component: App,
    canActivate: [authGuard],
    children: [
      {
        path: 'admin',
        component: AdminPanelComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'admin'
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'admin'
  }
];
