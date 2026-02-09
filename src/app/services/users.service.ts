import { Injectable } from '@angular/core';
import { User } from '../core/types';
import { SupabaseService } from './supabase.service';
import { USERS_TABLE_NAME } from '../core/constants';
import { BaseTableService } from './base-table.service';
import { RecordValidationError } from '../core/errors';
import { AuthError } from '@supabase/supabase-js';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseTableService<User>{
  constructor(supabase: SupabaseService) {
    super(supabase, USERS_TABLE_NAME);
   }

   override async createRecord(user: User): Promise<void> {

    const validUser: any = this.validateRecord(user);

     const { data, error } = await this.supabase.client.rpc('create_full_user', {
      user_email: validUser.email,
      user_password: validUser.password,
      user_name: validUser.name,
      user_last_name: validUser.last_name,
      user_phone: validUser.phone,
      user_type: validUser.type || 'guest'
     });

     if (error) {
      console.error(error);
      throw new AuthError("Ошибка при регистрации пользователя");
     }

     this.tableChanges$.next();
     return data;
    
   }

  override async updateRecord(id: number, user: User): Promise<void> {
    const validUser: any = this.validateRecord(user);
    validUser.user_uuid = user.userUuid;

    const { error } = await this.supabase.client.rpc('update_full_user', {
      target_user_id: validUser.user_uuid,
      user_email: validUser.email,
      user_password: validUser.password,
      user_name: validUser.name,
      user_last_name: validUser.last_name,
      user_phone: validUser.phone,
      user_type: validUser.type
    });
    
    if (error) {
      console.error(error);
      throw new AuthError("Ошибка при обновлении пользователя");
     }

     this.tableChanges$.next();
  }

  override async deleteRecord(id: number): Promise<void> {
    const user = await firstValueFrom(this.getRecordById(id));

    if (!user)
      throw new Error("Пользователь не найден");

    const uuid = user.userUuid;

    const { error } = await this.supabase.client.rpc('delete_full_user', {
      target_user_id: uuid
    });

    if (error){
      console.error('Ошибка при удалении пользователя:', error);
      throw error;
    }

    this.tableChanges$.next();
  }

  protected toDomain(row: any): User {
    return {
      id: row.id,
      name: row.name,
      password: row.password,
      lastName: row.last_name,
      email: row.email,
      phone: row.phone,
      type: row.type,
      userUuid: row.user_uuid
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
    password: user.password || null,
    last_name: user.lastName || null,
    email: user.email || null,
    phone: user.phone || null,
    type: user.type
  }
}
}
