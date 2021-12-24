import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forbiddenNameValidator } from './shared/username.validator';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {

  constructor(private fb: FormBuilder) {}

  registrationForm = this.fb.group({
    userName: ['',
      [
        Validators.required,
        Validators.minLength(3),
        forbiddenNameValidator(/password/),
        forbiddenNameValidator(/admin/)
      ]],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      province: [''],
      postalCode: ['']
    })
  });

  // registrationForm = new FormGroup({
  //   userName: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   })
  // });

}
