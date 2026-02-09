import { Injectable, OnInit, Signal, signal } from '@angular/core';
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

  constructor(private supabase: SupabaseService, private userService: UsersService) {
    this.initializeAuth();
  }

  private async initializeAuth(): Promise<void> {

    const { data: { user } } = await this.supabase.client.auth.getUser();

    if (user) {
      this.currentUser.set(user as unknown as User);
    }

    this.supabase.client.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        this.currentUser.set(session.user as unknown as User);
      } else {
        this.currentUser.set(null);
      }
    });
  }

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
    
  }

  async logout() {
    const { error } = await this.supabase.client.auth.signOut();
    if (error) {
      throw new AuthError("Не удалось выйти из аккаунта");
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const { data: {session} } = await this.supabase.client.auth.getSession();
    return !!session;
  }
}
