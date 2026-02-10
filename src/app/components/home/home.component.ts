import { Component, inject, OnInit, signal } from '@angular/core';
import { StatsCardComponent } from "../stats-card/stats-card.component";
import { SupabaseService } from '../../services/supabase.service';
import { DETAILS_TABLE_NAME, ORDERS_TABLE_NAME, USERS_TABLE_NAME } from '../../core/constants';

@Component({
  selector: 'app-home',
  imports: [StatsCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  
  supabase = inject(SupabaseService);

  allOrdersMoney = signal<string>('-');

  repairsAmount = signal<string>('-');

  allDetailsCost = signal<string>('-');

  allUnfinishedOrders = signal<string>('-');
  
  async ngOnInit() {
    await this.countAllOrdersMoney();
    await this.countRepairsAmount();
    await this.countAllDetailCost();
    await this.countAllUnfinishedOrders();
  }

  async countAllOrdersMoney() {
    const { data, error } = await this.supabase.client
      .from(ORDERS_TABLE_NAME)
      .select('price.sum()')
      .single();

    if(error) {
      console.error(error);
      return;
    }

    this.allOrdersMoney.set(String(data!.sum)+'+');
  }

  async countRepairsAmount() {
    const { data, error } = await this.supabase.client
      .from(ORDERS_TABLE_NAME)
      .select('count()')
      .single();

    if(error) {
      console.error(error);
      return;
    }

    this.repairsAmount.set(String(data!.count));
  }


  async countAllDetailCost() {
    const { data, error } = await this.supabase.client
      .from(DETAILS_TABLE_NAME)
      .select('price.sum()')
      .single();

    if(error) {
      console.error(error);
      return;
    }

    this.allDetailsCost.set(String(data!.sum)+'+');
  }

  async countAllUnfinishedOrders() {
    const now = new Date().toISOString();

    const { data, error } = await this.supabase.client
    .from(ORDERS_TABLE_NAME)
    .select('count()')
    .gt('end_date', now)
    .single();

    if(error) {
      console.error(error);
      return;
    }

    this.allUnfinishedOrders.set(String(data.count));

  }

}
