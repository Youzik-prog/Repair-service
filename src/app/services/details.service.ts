import { Injectable } from '@angular/core';
import { BaseTableService } from './base-table.service';
import { Detail } from '../core/types';
import { SupabaseService } from './supabase.service';
import { DETAILS_TABLE_NAME } from '../core/constants';
import { RecordValidationError } from '../core/errors';

@Injectable({
  providedIn: 'root',
})
export class DetailsService extends BaseTableService<Detail>{

  constructor(supabase: SupabaseService) {
      super(supabase, DETAILS_TABLE_NAME);
    }

  protected override toDomain(row: any): Detail {
    return {
      id: row.id,
      name: row.name,
      price: row.price,
      dealerId: row.dealer_id
    }
  }
  protected override validateRecord(detail: Detail): object {
    if(!detail.name) {
      throw new RecordValidationError("Не заполнено название детали!");
    }

    return {
      name: detail.name,
      price: detail.price || null,
      dealer_id: detail.dealerId || null,
    }
  }
  
}
