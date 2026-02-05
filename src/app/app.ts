import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './services/supabase.service';
import { OrdersService } from './services/orders.service';
import { TableComponent } from './components/table/table.component';
import { ORDERS_CONFIG, USERS_CONFIG } from './core/columnsConfigs';
import { UsersService } from './services/users.service';
import { SignupComponent } from "./components/signup/signup.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TableComponent, SignupComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected readonly title = signal('Repair-service');

  public config = ORDERS_CONFIG;

  constructor(supabaseService: SupabaseService, public someService: OrdersService) {
    //supabaseService.getUsers();
    //orderService.getAllOrders();
  }
}
