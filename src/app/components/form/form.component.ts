import { Component, computed, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { showErrorMessage } from '../../core/utils';
import { ColumnConfig, TableService, User, UserType } from '../../core/types';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent<T> implements OnInit {

  tableService = input.required<TableService<T>>();

  config = input.required<Record<keyof T, ColumnConfig>>();

  columnKeys = computed(() => Object.keys(this.config()).filter(key => key !== 'id') as Extract<keyof T, string>[] );

  protected form = new FormGroup({});

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    for(let key of this.columnKeys()) {
      const config = this.config()[key];

      const control = new FormControl('', {
        validators: config.validators,
        updateOn: 'change'
      })

      this.form.addControl(key, control);
    }    
  }

  public async onSignUp() {
    if(this.form.valid) {
      try {
        await this.tableService().createRecord({...this.form.value} as T);
      } catch(error) {
        showErrorMessage(error);
      }
    } else {
      alert("Форма у нас с ошибками получилась");
    }
  }
}
 