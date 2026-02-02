import { ChangeDetectorRef, Component, computed, effect, inject, input, signal, Signal } from '@angular/core';
import { ColumnConfig, ColumnNames, TableService } from '../../core/types';
import { Observable, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  standalone: true,
})
export class TableComponent<T>{
  public tableService = input.required<TableService<T>>();

  public config = input.required<Record<keyof T, ColumnConfig>>();

  public allRecords: Signal<T[]> = toSignal(
    toObservable(this.tableService).pipe(
      switchMap(service => service.getAllRecords())
    ),
    { initialValue: [] }
  );

  protected readonly columnKeys = computed(() => Object.keys(this.config()) as Extract<keyof T, string>[]);

  private defaultTableRowsAmount: number = 10;

  protected formArray = new FormArray<FormGroup>([]);

  private cdr = inject(ChangeDetectorRef);
  
  constructor() {
    effect(() => {
      this.initForm(this.allRecords())
    })
  }

  private initForm(records: T[]) {
    this.formArray.clear();

    for(let item of records) {
      const group = new FormGroup({});

      for(let key of this.columnKeys()) {
        group.addControl(key as string, new FormControl(item[key]));
      }

      this.formArray.push(group);
    }

    this.cdr.markForCheck();
  }

  private saveRow(index: number) {
    const rowData = this.formArray.at(index).value;
    const originalId = (this.allRecords()[index] as any).id;

    console.log("Данные чота типа сохранены");
    
  }

}
