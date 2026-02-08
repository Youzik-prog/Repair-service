import { Injectable } from '@angular/core';
import { Dealer } from '../core/types';
import { DEALERS_TABLE_NAME } from '../core/constants';
import { SupabaseService } from './supabase.service';
import { BaseTableService } from './base-table.service';
import { RecordValidationError } from '../core/errors';

@Injectable({
  providedIn: 'root',
})
export class DealersService extends BaseTableService<Dealer> {
  constructor( supabase: SupabaseService) { 
    super(supabase, DEALERS_TABLE_NAME);
  }

  protected override toDomain(row: any): Dealer {
    return {
      id: row.id,
      name: row.name, 
      adress: row.adress,
      phone: row.phone,
      email: row.email
    }
  }
  
  protected override validateRecord(dealer: Dealer): object {
    if(!dealer.name) {
      throw new RecordValidationError("Не заполнено название поставщика");
    }

    return {
      name: dealer.name,
      adress: dealer.adress || null,
      phone: dealer.phone || null,
      email: dealer.email || null
    }
  }
  
  
}
