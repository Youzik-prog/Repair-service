import { Injectable } from '@angular/core';
import { User } from '../core/types';
import { SupabaseService } from './supabase.service';
import { USERS_TABLE_NAME } from '../core/constants';
import { BaseTableService } from './base-table.service';
import { RecordValidationError } from '../core/errors';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseTableService<User>{
  constructor(supabase: SupabaseService) {
    super(supabase, USERS_TABLE_NAME);
   }

  protected toDomain(row: any): User {
    return {
      id: row.id,
      name: row.name,
      password: row.password,
      lastName: row.last_name,
      email: row.email,
      phone: row.phone,
      type: row.type
    };
  }

  protected validateRecord = function(user: User): object {
  if(!user.name) {
    throw new RecordValidationError("Не заполнено имя пользователя!");
  } 
  else if(!user.password) {
    throw new RecordValidationError("Не заполнен пароль!");
  } 
  else if(!user.email && !user.phone) {
    throw new RecordValidationError("Нужно заполнить номер телефона или электронную почту!");
  }
  else if(!user.type) {
    throw new RecordValidationError("Не заполнен тип пользователя!");
  }

  return {
    name: user.name,
    password: user.password,
    last_name: user.lastName || null,
    email: user.email || null,
    phone: user.phone || null,
    type: user.type
  }
}
}
