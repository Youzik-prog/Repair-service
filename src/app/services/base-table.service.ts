import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { firstValueFrom, from, map, Observable, Subject } from 'rxjs';
import { ColumnNames, TableService } from '../core/types';
import _, { sortBy } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseTableService<T> implements TableService<T> {

  public readonly tableChanges$: Subject<void> = new Subject();

  constructor(protected supabase: SupabaseService, public readonly tableName: string) { }

  protected abstract toDomain(row: any): T;
  protected abstract validateRecord(record: T): object;
  
  getAllRecords(transformation: {
    sortBy?: ColumnNames<T>,
    sortAscending?: boolean,
    filterBy?: ColumnNames<T>,
    filterFunction?: (el: unknown) => boolean
  } = {sortAscending: true, filterFunction: () => true}): Observable<T[]> {
    let query = this.supabase.client
    .from(this.tableName)
    .select("*");

    if (transformation.sortBy) {
      const validSortBy = _.snakeCase(transformation.sortBy);
      query = query.order(validSortBy, { ascending: transformation.sortAscending });
    } else {
      query = query.order('id', { ascending: transformation.sortAscending });
    }

    return from(query).pipe(
      map(response => {
        if (response.error) throw response.error;
        let data = (response.data || []).map(row => this.toDomain(row));
        if(transformation.filterBy && transformation.filterFunction) {
          const column = transformation.filterBy;
          const filterFn = transformation.filterFunction;
          data = data.filter((row) => filterFn(row[column]))
        }

        return data;
      })
    );
  }

  getRecordById(id: number): Observable<T | null> {
    return from(
      this.supabase.client
        .from(this.tableName)
        .select("*")
        .eq('id', id)
        .single()
    ).pipe(
      map(response => response.data ? this.toDomain(response.data) : null)
    );
  }

  getRecordsByColumn(column: ColumnNames<T>, value: any): Observable<T[]> {
    return from(this.supabase.client
      .from(this.tableName)
      .select('*')
      .eq(column, value)
    ).pipe(
        map(response => {
        if (response.error) throw response.error;
        return (response.data || []).map(row => this.toDomain(row));
      })
      )
  }

  async updateRecord(id: number, record: T) {
    const { error } = await this.supabase.client
      .from(this.tableName)
      .update(this.validateRecord(record))
      .eq('id', id);

    if (error) throw error;
    this.tableChanges$.next();
  }

  async createRecord(record: T) {
    const { error } = await this.supabase.client
      .from(this.tableName)
      .insert(this.validateRecord(record));

    if (error) throw error;
    this.tableChanges$.next();
  }

  async deleteRecord(id: number) {
    const { error } = await this.supabase.client
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw error;
    this.tableChanges$.next();
  }

  async exportToCSV(fileName: string = `${this.tableName}.csv`) {
    const data = await firstValueFrom(this.getAllRecords());

    if(data.length === 0) {
      throw new Error("Экспортируемая таблица пуста.");
    }

    const keys = Object.keys(data[0] as object) as (keyof T)[];
    const headers = keys.join(';');

    const csvRows = data.map(row => {
      return keys.map(key => {
        const value = row[key];

        const escaped = ('' + (value ?? '')).replace(/"/g, '""');
        return `"${escaped}"`;
      }).join(';');
    });

    const csvContent = [headers, ...csvRows].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], {type: 'text/csv;charset=utf8;'});
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

}
