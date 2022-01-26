import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, MatSortable, Sort} from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';

import {CommonService} from '../../../../shared/services/common.service';
import {UserService} from '../../services/user.service';
import {PaginationResult} from '../../../../shared/models/pagination-result';
import {User} from '../../models/response/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit, AfterViewInit {

  listData: PaginationResult<User>;
  originalUsersList: User[];

  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['no', 'profilepicture', 'name', 'email', 'id'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private commonService: CommonService,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.getUsers();
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
    this.userService.getAllUsers(nextPageNumber).subscribe((result) => {
      this.listData = result;
      this.originalUsersList = this.listData.data;
      this.dataSource = new MatTableDataSource(this.originalUsersList);
      this.dataSource.sort = this.sort;
    });
  }
}
