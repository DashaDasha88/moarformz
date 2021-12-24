import { AbstractControl } from "@angular/forms";

export function PasswordValidator(control: AbstractControl): { [key: string]: boolean} | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password && confirmPassword && password.value !== confirmPassword.value ?
  {'misMatch': true} : //object with the name of the error - if password.value and confirmPassword.value are not the same, return the object
  null; // if the validation passes, return null
}