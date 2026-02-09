import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { USERS_CONFIG } from '../../core/columnsConfigs';
import { ColumnNames, User, UserType } from '../../core/types';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { showErrorMessage } from '../../core/utils';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  
  userService = inject(UsersService);

  config = USERS_CONFIG;

  columnKeys = () => Object.keys(this.config).filter(key => key !== 'id' && key !== 'type' && key !== 'userUuid') as ColumnNames<User>[];

  protected form = new FormGroup({});

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    for(let key of this.columnKeys()) {
      const config = this.config[key];

      const control = new FormControl('', {
        validators: config.validators,
        updateOn: 'change'
      })

      this.form.addControl(key, control);
    }    
  }

  async signnUp() {
    const user: any = this.form.getRawValue();

    user.type = UserType.admin;

    console.log(user);

    if(this.form.valid) {
      try {
        await this.userService.createRecord({...user} as User);
      } catch(error) {
        showErrorMessage(error);
      }
    } else {
      alert("Форма у нас с ошибками получилась");
    }
  }

}
