import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { USERS_CONFIG } from '../../core/columnsConfigs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  config = USERS_CONFIG;

  loginForm = new FormGroup({
    login: new FormControl('', {
      validators: Validators.maxLength(25),
      updateOn: 'change'
    }),
    password: new FormControl('', {
      validators: this.config['password'].validators,
      updateOn: 'change'
    })
  });

  loginAdmin() {
    
  }

}
