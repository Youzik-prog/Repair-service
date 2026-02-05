import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {

  protected signUpForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required]}),
    lastName: new FormControl(''),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(6)]}),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl('')
  }) 

  public onSignUp() {
    if(this.signUpForm.valid) {
      console.log('Данные формы:', this.signUpForm.value);
    } else {
      this.signUpForm.markAllAsTouched();
      console.error("Форма у нас с ошибочками получилась");
    }
  }
}
