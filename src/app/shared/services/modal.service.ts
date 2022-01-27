import {Injectable, TemplateRef} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/overlay';
import {Observable} from 'rxjs';

import {DialogComponent} from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: MatDialog) {
  }

  dialogRef: MatDialogRef<DialogComponent>;
  private mediumConf: any = {
    height: 'auto',
    width: '500px',
    autoFocus: true
  };

  open<T>(component: ComponentType<T> | TemplateRef<T>, data: any = {}) {
    this.mediumConf['data'] = {component, data};
    this.dialogRef = this.dialog.open(DialogComponent, this.mediumConf);
    return this.dialogRef;
  }

  close() {
    this.dialogRef.close();
  }

  afterClosed(): Observable<any> {
    return this.dialogRef.afterClosed();
  }
}
