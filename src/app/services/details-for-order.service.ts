import { Injectable } from '@angular/core';
import { BaseTableService } from './base-table.service';
import { DetailForOrder } from '../core/types';
import { SupabaseService } from './supabase.service';
import { DETAILS_FOR_ORDER_TABLE_NAME } from '../core/constants';
import { RecordValidationError } from '../core/errors';

@Injectable({
  providedIn: 'root',
})
export class DetailsForOrderService extends BaseTableService<DetailForOrder>{

  constructor(supabase: SupabaseService) {
    super(supabase, DETAILS_FOR_ORDER_TABLE_NAME);
  }

  protected override toDomain(row: any): DetailForOrder {
    return {
      id: row.id,
      detailId: row.detail_id,
      orderId: row.order_id,
      amount: row.amount,
    }
  }

  protected override validateRecord(detailForOrder: DetailForOrder): object {
    if(!detailForOrder.detailId) {
      throw new RecordValidationError("Не заполнен иднетификтор детали");
    }
    if(!detailForOrder.orderId) {
      throw new RecordValidationError("Не заполнен иднетификтор заказа");
    }

    return {
      detail_id: detailForOrder.detailId,
      order_id: detailForOrder.orderId,
      amount: detailForOrder.amount || 1, 
    }
  }
  
}
