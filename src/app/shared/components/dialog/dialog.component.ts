import {
  Component, Inject, Optional, Input,
  ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, AfterViewInit
} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit {

  @Input() showTitle = true;
  @Input() showButtons = true;

  @ViewChild('target', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;
  componentRef: ComponentRef<any>;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              private resolver: ComponentFactoryResolver,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngAfterViewInit(): void {
    const factory = this.resolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.viewContainerRef.createComponent(factory);
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
