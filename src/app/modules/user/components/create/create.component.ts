import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../../services/user.service';
import {CreateUserRequest} from '../../models/request/create-user-request';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  formGroup: FormGroup;

  // True if user is created successfully
  isCreated: boolean;

  // True if response return error
  hasError: boolean;

  // Error message
  errorMessage: string;

  constructor(private fb: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['Hiba', Validators.required],
      email: ['hiba@gmail.com', [Validators.required, Validators.email]],
      location: ['UK', [Validators.required]]
    });
  }

  submit(): void {
    this.isCreated = false;
    this.hasError = false;
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const formValue = <CreateUserRequest>this.formGroup.value;
      const payload: CreateUserRequest = {
        name: formValue.name,
        email: formValue.email,
        location: formValue.location
      };
      this.userService.createUser(payload)
        .subscribe(() => {
          this.isCreated = true;
        }, (e) => {
          this.hasError = true;
          this.errorMessage = e.error.Message;
        });
    }
  }
}
