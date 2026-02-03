import { ChangeDetectorRef, Component, computed, effect, inject, input, signal, Signal } from '@angular/core';
import { ColumnConfig, ColumnNames, TableService } from '../../core/types';
import { Observable, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isRowsEqual } from '../../core/utils';
import { set } from 'lodash';

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

  public isNewRowCreation = signal(false);
  
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

  public async updateRow(index: number) {
    const newRow = this.formArray.at(index).value as any;
    const oldRow = this.allRecords()[index];

    let id;
    if(newRow.id) {
      id = newRow.id;
    } else {
      return;
    }

    if(!isRowsEqual(newRow, oldRow)) {
      try {
        await this.tableService().updateRecord(id, newRow);

        console.log("Данные чота типа сохранены");   
      } catch(error) {
        console.log(error)
      }
    }
     
  }

  public createRow() {
    const group = new FormGroup({});

    for(const key of this.columnKeys()) {
      const colConfig = this.config()[key];
      
      group.addControl(key as string, new FormControl(''));
    }

    this.formArray.push(group);

    this.isNewRowCreation.set(true);

    setTimeout(() => {
      window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
    })
  }

  public async acceptRowCreation() {
    if(!this.isNewRowCreation())
      return;

    const lastRecord = this.formArray.at(-1).value;
    try{
      await this.tableService().createRecord(lastRecord);

      this.isNewRowCreation.set(false);
      console.log("Данные чота типа добавлены");   
    } catch(error) {
      console.log(error);
    }
    
  }

  public rejectRowCreation() {
    if(this.isNewRowCreation()) {
      this.formArray.removeAt(this.formArray.length - 1);
    }
    this.isNewRowCreation.set(false);
  }

  public async deleteRow(id: number) {
    const con = confirm("Удалить запись?");

    if (con) {
      this.tableService().deleteRecord(id);
    }
  }

}
