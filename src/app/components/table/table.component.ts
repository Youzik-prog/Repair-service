import { ChangeDetectorRef, Component, computed, effect, inject, Injector, input, signal, Signal } from '@angular/core';
import { ColumnConfig, ColumnNames, TableService } from '../../core/types';
import { combineLatest, merge, Observable, of, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isRowsEqual, showErrorMessage } from '../../core/utils';
import { RecordValidationError } from '../../core/errors';

@Component({
  selector: 'app-table',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  standalone: true,
})
export class TableComponent<T>{

  private injector = inject(Injector);

  public tableService = input.required<TableService<T>>();

  public config = input.required<Record<keyof T, ColumnConfig>>();

  public sortState = signal<{ sortBy: ColumnNames<T> | null, ascending: boolean}>({
    sortBy: null,
    ascending: true
  });

  public filterState = signal<{ filterBy: ColumnNames<T> | undefined, filterFunction: (el: unknown) => boolean}>({
    filterBy: undefined,
    filterFunction: () => true,
  });

  public allRecords: Signal<T[]> = toSignal(
    toObservable(this.tableService).pipe(
      switchMap((service) => {
        return combineLatest([
          merge(of(null), service.tableChanges$), 
          toObservable(this.sortState, { injector: this.injector }),
          toObservable(this.filterState, { injector: this.injector }),
        ]).pipe(
          switchMap(([_, sort, filter]) => {
            return service.getAllRecords({
              sortBy: sort.sortBy ?? undefined,
              sortAscending: sort.ascending,
              filterBy: filter.filterBy,
              filterFunction: filter.filterFunction,
            });
          })
        );
      })
    ),
    { initialValue: [], injector: this.injector }
  );

  protected readonly columnKeys = computed(() => Object.keys(this.config()) as ColumnNames<T>[]);

  private defaultTableRowsAmount: number = 10;

  protected formArray = new FormArray<FormGroup>([]);

  protected filterForm = new FormGroup({
    column: new FormControl('id'),
    operator: new FormControl('equal'),
    value: new FormControl('', [Validators.required, Validators.maxLength(25)]),
  })

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
        const config = this.config()[key];

        const control = new FormControl(item[key], {
          validators: config.validators, 
          updateOn: 'change'});

        group.addControl(key as string, control);
      }

      this.formArray.push(group);
    }

    this.cdr.markForCheck();
  }

  public async updateRow(index: number) {
    if(!this.checkRowValidators(index))
      return;

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
        this.initForm(this.allRecords());
        showErrorMessage(error);
      }
    }
     
  }

  public createRow() {
    const group = new FormGroup({});

    for(const key of this.columnKeys()) {
      const colConfig = this.config()[key];

      const control = new FormControl('', {
          validators: colConfig.validators, 
          updateOn: 'change'});
      
      group.addControl(key as string, control);
    }

    this.formArray.push(group);

    this.isNewRowCreation.set(true);

    setTimeout(() => {
      window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
    })
  }

  public async acceptRowCreation() {
    if(!this.isNewRowCreation() || !this.checkRowValidators(this.formArray.length - 1))
      return;

    const lastRecord = this.formArray.at(-1).value;
    try{
      await this.tableService().createRecord(lastRecord);
      this.isNewRowCreation.set(false);
      console.log("Данные чота типа добавлены");
    } catch(error) {
      showErrorMessage(error);
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
      try {
       await this.tableService().deleteRecord(id);
      } catch(error) {
        showErrorMessage(error);
      }
    }
  }

  public async sortTable(column: ColumnNames<T>) {
    if(this.sortState().sortBy === column) {
      this.sortState.update((prev) => ({sortBy: prev.sortBy, ascending: !prev.ascending}))

      
    } else {
      this.sortState.set({sortBy: column, ascending: true})
    }
  }

  public filterTable() {
    let { column, operator, value } = this.filterForm.getRawValue();

    column ??= 'id';
    value ??= '';

    let result: any = {filterBy: column as ColumnNames<T>};

    let func: (el: T) => boolean;

    switch(operator) {
      case 'equal': 
        func = (el) => el == value;
        break;
      case 'less':
        func = (el) => el < value;
        break;
      case 'bigger':
        func = (el) => el > value;
        break;
      default:
        func = () => true;
    }

    result.filterFunction = func;

    this.filterState.set(result);
  }

  public resetFilter() {
    this.filterState.set({
      filterBy: undefined,
      filterFunction: () => true,});
  }

  public async downloadTable() {
    await this.tableService().exportToCSV();
  }

  private checkRowValidators(index: number): boolean {
    const rowGroup = this.formArray.at(index);

    if(rowGroup.invalid)
      return false;
    else
      return true;
  }

}
