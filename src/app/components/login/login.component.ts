import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { USERS_CONFIG } from '../../core/columnsConfigs';
import { AuthService } from '../../services/auth.service';
import { showErrorMessage } from '../../core/utils';
import { Router, RouterLink } from "@angular/router";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private authService = inject(AuthService);

  private router = inject(Router);

  private loginPattern = /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+|^\+\d+)$/;

  config = USERS_CONFIG;

  loginForm = new FormGroup({
    login: new FormControl('', {
      validators: [Validators.required, Validators.pattern(this.loginPattern), Validators.maxLength(25)],
      updateOn: 'change'
    }),
    password: new FormControl('', {
      validators: this.config['password'].validators,
      updateOn: 'change'
    })
  });

  async loginAdmin() {
    if(this.loginForm.invalid) return;

    const { login, password} = this.loginForm.value;
    
    try {
      await this.authService.login(login!, password!);

      console.log("Успешный логин!");

      this.router.navigate(['/home']);
    } catch(error) {
      showErrorMessage(error)
    }

    
  }

}
