import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './services/supabase.service';
import { OrdersService } from './services/orders.service';
import { TableComponent } from './components/table/table.component';
import { DEALERS_CONFIG, ORDERS_CONFIG, USERS_CONFIG } from './core/columnsConfigs';
import { UsersService } from './services/users.service';
import { FormComponent } from "./components/form/form.component";
import { DealersService } from './services/dealers.service';
import { LoginComponent } from "./components/login/login.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TableComponent, FormComponent, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true,
})
export class App {
  protected readonly title = signal('Repair-service');

  public config = USERS_CONFIG;

  constructor(supabaseService: SupabaseService, public someService: UsersService) {
    //supabaseService.getUsers();
    //orderService.getAllOrders();
  }
}
