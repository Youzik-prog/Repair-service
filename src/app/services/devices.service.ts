import { Injectable } from '@angular/core';
import { BaseTableService } from './base-table.service';
import { Device } from '../core/types';
import { SupabaseService } from './supabase.service';
import { DEVICES_TABLE_NAME } from '../core/constants';
import { RecordValidationError } from '../core/errors';

@Injectable({
  providedIn: 'root',
})
export class DevicesService extends BaseTableService<Device> {
  
  constructor(supabase: SupabaseService) {
      super(supabase, DEVICES_TABLE_NAME);
  }

  protected override toDomain(row: any): Device {
    return {
      id: row.id,
      vendor: row.vendor,
      model: row.model,
      year: row.year,
      deviceTypeId: row.device_type_id
    }
  }
  protected override validateRecord(device: Device): object {
    if(!device.vendor) {
      throw new RecordValidationError("Не заполнен производитель устройства");
    }

    return {
      vendor: device.vendor,
      model: device.model || null,
      year: device.year || null,
      device_type_id: device.deviceTypeId
    }
  }
}
