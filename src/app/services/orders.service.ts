import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Order } from '../core/types';
import { ORDERS_TABLE_NAME } from '../core/constants';
import { BaseTableService } from './base-table.service';
import { RecordValidationError } from '../core/errors';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends BaseTableService<Order>{

  constructor( supabase: SupabaseService) {
    super(supabase, ORDERS_TABLE_NAME);
   }

   protected toDomain(row: any): Order {
   return {
      id: row.id,
      deviceId: row.device_id,
      workerId: row.worker_id,
      userId: row.user_id,
      price: row.price,
      startDate: row.start_date,
      endDate: row.end_date,
    }
  }

  protected validateRecord(order: Order): object {
    if(order.startDate && order.endDate) {
      if(new Date(order.startDate) > new Date(order.endDate)) {
        throw new RecordValidationError("Дата начала ремонта не может быть позднее даты окончания!");
      }
    }
  
    return {
      device_id: order.deviceId,
      worker_id: order.workerId || null,
      user_id: order.userId || null,
      price: order.price || null,
      start_date: order.startDate || null,
      end_date: order.endDate || null
    }
  }
}
