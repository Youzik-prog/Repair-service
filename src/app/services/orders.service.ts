import { Injectable, OnInit } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Order, TableService } from '../core/types';
import { filter, from, map, Observable, of, Subject } from 'rxjs';
import { ORDERS_TABLE_NAME } from '../core/constants';
import { toCamel, toSnake, validateOrder } from '../core/utils';
import { isOrder } from '../core/typeguards';
import { RecordValidationError } from '../core/errors';

@Injectable({
  providedIn: 'root',
})
export class OrdersService implements TableService<Order>{

  tableName = ORDERS_TABLE_NAME;

  tableChanges$: Subject<void> = new Subject();

  constructor(private supabase: SupabaseService) {
   }

  getAllRecords() : Observable<Order[]> {
    return from(this.supabase.client.from(this.tableName).select("*").order('id', { ascending: true })).pipe(
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

  getRecordById(id: number): Observable<Order | null> {
    return this.getAllRecords().pipe(
      map(data => data.find(order => order.id === id) ?? null)
    )
  }

  async updateRecord(id: number, order: Order) {
    if (!isOrder(order))
      throw new Error('"order" parameter is not "Order" type!');

    const newRecord = validateOrder(order);

    const { error } = await this.supabase.client
    .from(this.tableName)
    .update(newRecord)
    .eq('id', id);

    if(error) throw error;
    
    this.tableChanges$.next();
  }

  async createRecord(order: Order) {
    if (!isOrder(order))
      throw new Error('"order" parameter is not "Order" type!');

    const newRecord = validateOrder(order);

    const { error } = await this.supabase.client
    .from(this.tableName)
    .insert(newRecord);
    
    if(error) throw error;
    
    this.tableChanges$.next();
  }

  async deleteRecord(id: Number) {
    const { error } = await this.supabase.client
    .from(this.tableName)
    .delete()
    .eq('id', id);

    if(error) throw error;
    
    this.tableChanges$.next();
  }


}
