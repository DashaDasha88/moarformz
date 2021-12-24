import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from './shared/password.validator';
import { forbiddenNameValidator } from './shared/username.validator';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  registrationForm!: FormGroup;

  get userName() {
    return this.registrationForm.get('userName');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.registrationForm = this.fb.group({
      userName: ['',
        [
          Validators.required,
          Validators.minLength(3),
          forbiddenNameValidator(/password/),
          forbiddenNameValidator(/admin/)
        ]],
      email: [''],
      subscribe: [false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        province: [''],
        postalCode: ['']
      })
    }, {validator: PasswordValidator}); //because the cross-field validator acts on the form group, not the individual controls
  }

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
