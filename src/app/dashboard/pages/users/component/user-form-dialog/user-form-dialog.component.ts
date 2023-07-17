import { Component } from '@angular/core';
import { FormControl, 
  FormGroup, 
  Validators, 
  ValidationErrors, 
  ValidatorFn, 
  AbstractControl} from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent {
  nameControl = new FormControl(null, [
    Validators.required,
    this.noNumber()
  ]);
  lastNameControl = new FormControl(null, [
    Validators.required
  ]);
  emailControl = new FormControl(null, [
    Validators.required
  ]);
  passwordControl = new FormControl(null, [
    Validators.required
  ]);

  userForm = new FormGroup({
    name : this.nameControl,
    lastname : this.lastNameControl,
    email : this.emailControl,
    password : this.passwordControl,
  })
  
  noNumber(): ValidatorFn{
    return (control : AbstractControl): ValidationErrors | null =>{
      if (control instanceof FormControl){
        if (control.value?.includes('asd')){
          return{
            noNumber: true
          }
        }
      }

      return null
    }
  }

    constructor(private dialogRef: MatDialogRef <UserFormDialogComponent>){}

  onSubmit(): void {
    if(this.userForm.invalid){
      this.userForm.markAllAsTouched()
    }else this.dialogRef.close(this.userForm.value)
  }
}