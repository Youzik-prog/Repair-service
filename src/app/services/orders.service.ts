import { Injectable, OnInit } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Order } from '../core/types';
import { filter, from, map, Observable, of } from 'rxjs';
import { ORDERS_TABLE_NAME } from '../core/constants';

@Injectable({
  providedIn: 'root',
})
export class OrdersService{
  constructor(private supabase: SupabaseService) {
    this.getOrderById(2).subscribe(el => console.log(el));
   }

  getAllOrders() : Observable<Order[]> {
    return from(this.supabase.client.from(ORDERS_TABLE_NAME).select("*")).pipe(
      map(response => {
      if (response.error) throw response.error;
      return response.data || [];
    }),
      map(data => data.map(row => 
        ({
          id: row.id,
          deviceId: row.device_id,
          workerId: row.worker_id,
          userId: row.user_id,
          price: row.price,
          startDate: row.start_date,
          endDate: row.end_date,
        })
      ))
    )
  }

  getOrderById(id: number): Observable<Order | null> {
    return this.getAllOrders().pipe(
      map(data => data.find(order => order.id === id) ?? null)
    )
  }


}
