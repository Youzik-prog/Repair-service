import { Injectable } from '@angular/core';
import { BaseTableService } from './base-table.service';
import { SupabaseService } from './supabase.service';
import { DEVICES_TABLE_NAME, DEVICES_TYPES_TABLE_NAME } from '../core/constants';
import { RecordValidationError } from '../core/errors';
import { DevicesTypes } from '../core/types';

@Injectable({
  providedIn: 'root',
})
export class DevicesTypesService  extends BaseTableService<DevicesTypes>{

  constructor(supabase: SupabaseService) {
     super(supabase, DEVICES_TYPES_TABLE_NAME);
 }

  protected override toDomain(row: any): DevicesTypes {
    return {
      id: row.id,
      name: row.name
    }
  }

  protected override validateRecord(deviceType: DevicesTypes): object {
    if(!deviceType.name){
      throw new RecordValidationError("Не заполнен тип устройства");
    }

    return {
      name: deviceType.name
    }
  }

  
}
