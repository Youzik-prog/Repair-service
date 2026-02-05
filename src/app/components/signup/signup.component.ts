import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { USERS_CONFIG } from '../../core/columnsConfigs';
import { showErrorMessage } from '../../core/utils';
import { User, UserType } from '../../core/types';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {

  user_config = USERS_CONFIG;

  columnKeys = Object.keys(this.user_config);

  protected signUpForm = new FormGroup({});

  constructor(private usersService: UsersService) {
    this.initForm();
   }

  initForm() {
    for(let key of this.columnKeys) {
      const config = this.user_config[key];

      const control = new FormControl('', {
        validators: config.validators,
        updateOn: 'change'
      })

      this.signUpForm.addControl(key, control);
    }    
  }

  public async onSignUp() {
    if(this.signUpForm.valid) {
      try {
        console.log({...this.signUpForm.value, type: UserType.user})
      await this.usersService.createRecord({...this.signUpForm.value, type: UserType.user} as User);
      } catch(error) {
        showErrorMessage(error);
      }
    } else {
      alert("Форма у нас с ошибками получилась");
    }
  }
}
 