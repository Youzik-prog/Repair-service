import { Injectable } from '@angular/core';
import { WORKERS_TABLE_NAME } from '../core/constants';
import { SupabaseService } from './supabase.service';
import { BaseTableService } from './base-table.service';
import { Worker } from '../core/types';
import { RecordValidationError } from '../core/errors';
import { email } from '@angular/forms/signals';

@Injectable({
  providedIn: 'root',
})
export class WorkersService extends BaseTableService<Worker> {

  constructor(supabase: SupabaseService) {
    super(supabase, WORKERS_TABLE_NAME);
  }

  protected override toDomain(row: any): Worker {
    return {
      id: row.id,
      name: row.name, 
      lastName: row.last_name, 
      phone: row.phone,
      email: row.email,
      skillLevel: row.skill_level
    }
  }

  protected override validateRecord(worker: Worker): object {
    if(!worker.name) {
      throw new RecordValidationError("Не заполнено имя работника");
    }
    else if(!worker.phone && !worker.email) {
      throw new RecordValidationError("Не заполнен номер телефона или электронная почта");
    }

    return {
      name: worker.name,
      last_name: worker.lastName || null,
      phone: worker.phone || null,
      email: worker.email || null,
      skill_level: worker.skillLevel || null
    }
  }
}
