import { Injectable, OnInit } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Order, TableService } from '../core/types';
import { filter, from, map, Observable, of } from 'rxjs';
import { ORDERS_TABLE_NAME } from '../core/constants';
import { toCamel, toSnake } from '../core/utils';
import { isOrder } from '../core/typeguards';

@Injectable({
  providedIn: 'root',
})
export class OrdersService implements TableService<Order>{
  constructor(private supabase: SupabaseService) {
   }

  getAllRecords() : Observable<Order[]> {
    return from(this.supabase.client.from(ORDERS_TABLE_NAME).select("*").order('id', { ascending: true })).pipe(
      map(response => {
      if (response.error) throw response.error;
      return response.data || [];
    }),
      map(data => data.map(row => //toCamel(row) as Order
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

  getRecordById(id: number): Observable<Order | null> {
    return this.getAllRecords().pipe(
      map(data => data.find(order => order.id === id) ?? null)
    )
  }

  async updateRecord(id: number, order: Order) {
    if (!isOrder(order))
      throw new Error('"order" parameter is not "Order" type!');

    const orderSnakeCase = toSnake(order);

    console.log(orderSnakeCase);
    
    delete orderSnakeCase['id'];

    const { error } = await this.supabase.client
    .from(ORDERS_TABLE_NAME)
    .update(orderSnakeCase)
    .eq('id', id);

    if(error) throw error;
  }


}
