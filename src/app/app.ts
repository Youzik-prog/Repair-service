import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SupabaseService } from './services/supabase.service';
import { OrdersService } from './services/orders.service';
import { TableComponent } from './components/table/table.component';
import { DEALERS_CONFIG, ORDERS_CONFIG, USERS_CONFIG } from './core/columnsConfigs';
import { UsersService } from './services/users.service';
import { FormComponent } from "./components/form/form.component";
import { DealersService } from './services/dealers.service';
import { LoginComponent } from "./components/login/login.component";
import { UserType } from './core/types';
import { ProfileComponent } from "./components/profile/profile.component";
import { AuthService } from './services/auth.service';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected readonly title = signal('Repair-service');

  authService = inject(AuthService);
  router = inject(Router);
 

  public config = USERS_CONFIG;

  // public user = {id: 1, name: 'Валерий', password: '1234', type: UserType.admin, userUuid: 'kkdsfljklsdkflslgkflg'}

  constructor(private supabaseService: SupabaseService, public someService: UsersService) {
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}
