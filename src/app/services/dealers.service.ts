import { Injectable } from '@angular/core';
import { Dealer, TableService } from '../core/types';
import { Subject, Observable, from, map } from 'rxjs';
import { DEALERS_TABLE_NAME } from '../core/constants';
import { SupabaseService } from './supabase.service';
import { BaseTableService } from './base-table.service';

@Injectable({
  providedIn: 'root',
})
export class DealersService extends BaseTableService<Dealer> {
  constructor( supabase: SupabaseService) { 
    super(supabase, DEALERS_TABLE_NAME);
  }

  protected override toDomain(row: any): Dealer {
    throw new Error('Method not implemented.');
  }
  
  protected override validateRecord(record: Dealer): object {
    throw new Error('Method not implemented.');
  }
  
  
}
