import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard, guestGuard } from './core/auth.guard';
import { App } from './app';
import { UsersService } from './services/users.service';
import { SignupComponent } from './components/signup/signup.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { SpravkaComponent } from './components/spravka/spravka.component';
import { TableComponent } from './components/table/table.component';
import { OrdersService } from './services/orders.service';
import { DEALERS_CONFIG, DETAILS_CONFIG, DETAILS_FOR_ORDER_CONFIG, DEVICES_CONFIG, DEVICES_TYPES_CONFIG, ORDERS_CONFIG, USERS_CONFIG, WORKERS_CONFIG } from './core/columnsConfigs';
import { inject } from '@angular/core';
import { WorkersService } from './services/workers.service';
import { DevicesService } from './services/devices.service';
import { DetailsService } from './services/details.service';
import { DealersService } from './services/dealers.service';
import { DetailsForOrderService } from './services/details-for-order.service';
import { DevicesTypesService } from './services/devices-types.service';

const ordersServiceResolver = () => inject(OrdersService);
const usersServiceResolver = () => inject(UsersService);
const workersServiceResolver = () => inject(WorkersService);
const devicesServiceResolver = () => inject(DevicesService);
const detailsServiceResolver = () => inject(DetailsService);
const dealersServiceResolver = () => inject(DealersService);
const detailsForOrderServiceResolver = () => inject(DetailsForOrderService);
const devicesTypesServiceResolver = () => inject(DevicesTypesService);

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
        component: AdminPanelComponent,
        children: [
          { path: '', 
            redirectTo: 'home', 
            pathMatch: 'full' 
          },
          {
            path: 'home',
            component: HomeComponent
          },
          {
            path: 'orders',
            component: TableComponent,
            resolve: {
              tableService: ordersServiceResolver,
            },
            data: { config: ORDERS_CONFIG }
          },
          {
            path: 'users',
            component: TableComponent,
            resolve: {
              tableService: usersServiceResolver,
            },
            data: { config: USERS_CONFIG }
          },
          {
            path: 'workers',
            component: TableComponent,
            resolve: {
              tableService: workersServiceResolver,
            },
            data: { config: WORKERS_CONFIG }
          },
          {
            path: 'devices',
            component: TableComponent,
            resolve: {
              tableService: devicesServiceResolver,
            },
            data: { config: DEVICES_CONFIG }
          },
          {
            path: 'details',
            component: TableComponent,
            resolve: {
              tableService: detailsServiceResolver,
            },
            data: { config: DETAILS_CONFIG }
          },
          {
            path: 'dealers',
            component: TableComponent,
            resolve: {
              tableService: dealersServiceResolver,
            },
            data: { config: DEALERS_CONFIG }
          },
          {
            path: 'details-for-order',
            component: TableComponent,
            resolve: {
              tableService: detailsForOrderServiceResolver,
            },
            data: { config: DETAILS_FOR_ORDER_CONFIG }
          },
          {
            path: 'devices-types',
            component: TableComponent,
            resolve: {
              tableService: devicesTypesServiceResolver,
            },
            data: { config: DEVICES_TYPES_CONFIG }
          },
        ]
      },
      {
        path: 'spravka',
        component: SpravkaComponent
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
