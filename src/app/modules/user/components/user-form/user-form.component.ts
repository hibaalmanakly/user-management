import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import {User} from '../../models/response/user';
import {State} from '../../store/reducers/users.reducer';
import {getError, getCurrentUser} from '../../store/selectors/users-selector';
import {ModalService} from '../../../../shared/services/modal.service';
import {UserAction} from '../../store/actions';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit, OnDestroy {

  @Input() title = 'Edit User';

  @Input() isCreateMode = false;

  formGroup: FormGroup;

  sub: Subscription;

  // Contains current user details while editing
  currentUser: User;

  errorMessage: string;

  constructor(private fb: FormBuilder,
              private modalService: ModalService,
              private store: Store<State>) {
  }

  ngOnInit(): void {
    this.currentUser = new User();
    this.sub = this.store.select(getCurrentUser).subscribe((result: User) => {
      this.currentUser = result;
      this.bindForm();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  submit(): void {
    this.errorMessage = '';
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const payload: User = {
        ...this.currentUser,
        ...this.formGroup.value
      };

      if (this.currentUser.id === 0) {
        this.store.dispatch(UserAction.setCurrentUser({user: payload}));
        this.store.dispatch(UserAction.createUser({user: payload}));
        this.sub = this.store.select(getError).subscribe((error: string) => {
          this.errorMessage = error;
        });
      } else {
        this.store.dispatch(UserAction.setCurrentUser({user: payload}));
        this.store.dispatch(UserAction.editUser({user: payload}));
        this.sub = this.store.select(getError).subscribe((error: string) => {
          this.errorMessage = error;
        });
        this.modalService.close();
      }
    }
  }

  // @ts-ignore
  private valueOf = (key: string): string => (this.currentUser && this.currentUser[key]) ? this.currentUser[key] : '';

  private bindForm() {
    this.formGroup = this.fb.group({
      name: [this.valueOf('name'), Validators.required],
      email: [this.valueOf('email'), [Validators.required, Validators.email]],
      location: [this.valueOf('location'), [Validators.required]]
    });
  }
}
