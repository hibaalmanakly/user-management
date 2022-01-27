import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, MatSortable, Sort} from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import {State} from '../../store/reducers/users.reducer';
import {getError, getUsersList} from '../../store/selectors/users-selector';
import {UserAction} from '../../store/actions';

import {CommonService} from '../../../../shared/services/common.service';
import {ModalService} from '../../../../shared/services/modal.service';
import {ConfirmationComponent} from '../../../../shared/components/confirmation/confirmation.component';
import {PaginationResult} from '../../../../shared/models/pagination-result';
import {UserFormComponent} from '../user-form/user-form.component';
import {User} from '../../models/response/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit, OnDestroy {

  listData: PaginationResult<User>;
  originalUsersList: User[];
  sub: Subscription;


  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['no', 'profilepicture', 'name', 'email', 'id'];
  errorMessage: string;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private commonService: CommonService,
              private modalService: ModalService,
              private router: Router,
              private store: Store<State>) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  createUser() {
    this.store.dispatch(UserAction.initializeCurrentUser());
    this.router.navigate(['/user/create']).then();
  }

  editUser(user: User) {
    this.errorMessage = '';
    this.store.dispatch(UserAction.setCurrentUser({user: user}));
    const dialogRef = this.modalService.open(UserFormComponent);
    dialogRef.componentInstance.showTitle = false;
    dialogRef.componentInstance.showButtons = false;
  }

  deleteUser(user: User) {
    this.errorMessage = '';
    this.store.dispatch(UserAction.setCurrentUser({user: user}));
    const dialogRef = this.modalService.open(ConfirmationComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.store.dispatch(UserAction.deleteUser({user: user}));
        this.sub = this.store.select(getError).subscribe((error: string) => {
          this.errorMessage = error;
        });
      }
    });
  }

  /**
   * Get users when pagination is changed
   * @param page PageEvent
   */
  onPageChange(page: PageEvent) {
    // Reset sort when pagination is changed
    this.sort.sort(<MatSortable>{id: '', start: 'asc', disableClear: false});
    this.dataSource.sort = this.sort;
    const nextPage = page.pageIndex + 1;
    this.getUsers(nextPage);
  }

  /**
   * Filter results by input value
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Sort result by name or by email Asc or Desc
   * @param sort contain column name and direction (asc, desc)
   */
  sortResults(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    const sortedList = this.originalUsersList.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.commonService.compare(a.name, b.name, isAsc);
        case 'email':
          return this.commonService.compare(a.email, b.email, isAsc);
        default:
          return this.commonService.compare(a.name, b.name, isAsc);
      }
    });
    this.dataSource = new MatTableDataSource(sortedList);
  }

  /**
   * Get users list by page number
   * @param nextPageNumber Page number of fetched data
   * @private private method
   */
  private getUsers(nextPageNumber = 1) {
    this.store.dispatch(UserAction.loadUsersList({pageNumber: nextPageNumber}));
    this.sub = this.store.select(getUsersList).subscribe((result) => {
      if (result) {
        this.listData = result;
        this.originalUsersList = result.data;
        this.dataSource = new MatTableDataSource(this.originalUsersList);
        this.dataSource.sort = this.sort;
      }
    });
  }
}
