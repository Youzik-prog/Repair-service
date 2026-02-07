import { Injectable, Signal, signal } from '@angular/core';
import { User, UserType } from '../core/types';
import { SupabaseService } from './supabase.service';
import { showErrorMessage } from '../core/utils';
import { UsersService } from './users.service';
import { ColumnNames, ColumnType } from '../core/types';
import { AuthError } from '@supabase/supabase-js';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly currentUser = signal<User | null>(null);

  constructor(private supabase: SupabaseService, private userService: UsersService) {}

  async login(identifier: string, pass: string): Promise<void> {

    const isEmail = identifier.includes('@');
    let authData: any = {password: pass};
    let searchColumn: ColumnNames<User>;
    let searchValue: string;

    if(isEmail) {
      authData.email = identifier.trim().toLowerCase();
      searchColumn = 'email';
      searchValue = authData.email;
    } else {
      authData.phone = identifier.trim();
      searchColumn = 'phone';
      searchValue = authData.phone;
    }

    console.log(authData);

    const { error: authError } = await this.supabase.client.auth.signInWithPassword(authData);

    if(authError){
      console.error(authError);
      throw authError;}
      // throw new AuthError("Введены некорректные данные");

    let records: User[] = await firstValueFrom(this.userService.getRecordsByColumn(searchColumn, searchValue));

    console.log(records);

    const user = records.length > 0 ? records[0] : null

    if(!user) throw new Error("Пользователь не найден в системе");

    if(user.type !== UserType.admin) {
      await this.supabase.client.auth.signOut();
      throw new AuthError("ТЕБЕ сюда нелья!🤨 Доступ только для админов😊\nЭто автоматизированное рабочее место менеджера ателье по ремонту бытовой техники только для крутых!😎");
    }

    this.currentUser.set(user);
    
  }

  async createUser(user: User) {

    let validatedUser: any = { password: user.password };

    if(user.email)
      validatedUser['email'] = user.email;
    else if(user.phone)
      validatedUser['phone'] = user.phone;

    const { data: authData, error: authError } = await this.supabase.client.auth.signUp(validatedUser);
    
    if(authError) throw authError;

    return authData.user;

  }
}
