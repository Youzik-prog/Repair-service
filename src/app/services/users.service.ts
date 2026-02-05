import { Injectable } from '@angular/core';
import { TableService, User } from '../core/types';
import { SupabaseService } from './supabase.service';
import { Subject, Observable, from, map } from 'rxjs';
import { USERS_TABLE_NAME } from '../core/constants';
import { isUser } from '../core/typeguards';
import { validateUser } from '../core/utils';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements TableService<User>{
  
  tableName: string = USERS_TABLE_NAME;

  tableChanges$: Subject<void> = new Subject();

  constructor(private supabase: SupabaseService) { }

  getAllRecords(): Observable<User[]> {
    return from(this.supabase.client.from(this.tableName).select("*").order('id', { ascending: true })).pipe(
          map(response => {
          if (response.error) throw response.error;
          return response.data || [];
        }),
          map(data => data.map(row => 
            ({
              id: row.id,
              name: row.name,
              password: row.password,
              lastName: row.last_name,
              email: row.email,
              phone: row.phone,
              type: row.type
            })
          ))
        )
  }

  getRecordById(id: number): Observable<User | null> {
    return this.getAllRecords().pipe(
      map(data => data.find(user => user.id === id) ?? null)
    )
  }

  async updateRecord(id: number, user: User) {
    if (!isUser(user))
          throw new Error('"user" parameter is not "User" type!');
    
        const newRecord = validateUser(user);
    
        const { error } = await this.supabase.client
        .from(this.tableName)
        .update(newRecord)
        .eq('id', id);
    
        if(error) throw error;
        
        this.tableChanges$.next();
  }

  async createRecord(user: User) {
    if (!isUser(user))
          throw new Error('"user" parameter is not "User" type!');
    
        const newRecord = validateUser(user);
    
        const { error } = await this.supabase.client
        .from(this.tableName)
        .insert(newRecord);
        
        if(error) throw error;
        
        this.tableChanges$.next();
  }

  async deleteRecord(id: number) {
    const { error } = await this.supabase.client
    .from(this.tableName)
    .delete()
    .eq('id', id);

    if(error) throw error;
    
    this.tableChanges$.next();
  }
  
}
