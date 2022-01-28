import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../../services/auth.service';
import {RegisterUserRequest} from '../../models/request/register-user-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;

  // Check if user is successfully created
  isUserCreated: boolean;

  // Check if user is already registered with this email
  isUserExist: boolean;

  // Error message
  errorMessage: string;

  constructor(private authService: AuthService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit(): void {
    this.isUserExist = false;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const formValue = <RegisterUserRequest>this.formGroup.value;
      const payload: RegisterUserRequest = {
        name: formValue.name,
        email: formValue.email,
        password: formValue.password
      };
      this.authService.registerNewUser(payload)
        .subscribe((result) => {
          if (result.code === 0) {
            this.isUserCreated = true;
          } else {
            this.isUserExist = true;
            this.errorMessage = result.message;
          }
        });
    }
  }
}
