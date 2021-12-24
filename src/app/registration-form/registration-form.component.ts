import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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

  get email() {
    return this.registrationForm.get('email');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }

  get alternatePhone() {
    return this.registrationForm.get('alternatePhone') as FormArray;
  }

  addAlternatePhone() {
    this.alternatePhone.push(this.fb.control(''));
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
      phone: [''],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        province: [''],
        postalCode: ['']
      }),
      alternateEmails: this.fb.array([]), //an array for dynamic form controls
      alternatePhone: this.fb.array([])
    }, {validator: PasswordValidator}); //because the cross-field validator acts on the form group, not the individual controls

    this.registrationForm.get('subscribe')?.valueChanges //valueChanges property returns an observable
      .subscribe(checkedValue => {
        const email = this.registrationForm.get('email');
        if (checkedValue) {
          email?.setValidators(Validators.required);
        } else {
          email?.clearValidators();
        }
        email?.updateValueAndValidity();
      })
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
