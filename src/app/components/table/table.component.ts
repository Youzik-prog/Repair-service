import { Component, input, signal, Signal } from '@angular/core';
import { ColumnNames, TableService } from '../../core/types';
import { Observable, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-table',
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  standalone: true,
})
export class TableComponent<T>{
  public tableService = input.required<TableService<T>>();

  public columnNames = input.required<ColumnNames<T>>();

  public allRecords: Signal<T[]> = toSignal(
    toObservable(this.tableService).pipe(
      switchMap(service => service.getAllRecords())
    ),
    { initialValue: [] }
  );

  private tableColumns: number = 123;
  
  private tableRows: number = this.allRecords().length;

  ngOnInit() {
  }


}
