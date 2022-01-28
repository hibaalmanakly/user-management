import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../../services/auth.service';
import {loginUserRequest} from '../../models/request/login-user-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  // True if response return error
  hasError: boolean;

  // Error message
  errorMessage: string;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit(): void {
    this.hasError = false;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const formValue = <loginUserRequest>this.formGroup.value;
      const payload: loginUserRequest = {
        email: formValue.email,
        password: formValue.password
      };
      this.authService.login(payload)
        .subscribe((result) => {
          if (result.code === 0) {
            localStorage.setItem('user', result.data.Token);
            this.router.navigateByUrl('/user').then();
          } else {
            this.hasError = true;
            this.errorMessage = result.message;
          }
        });
    }
  }
}
