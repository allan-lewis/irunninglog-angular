import { Observable } from 'rxjs/Rx';
import { ConfirmComponent } from './confirm.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfirmService {

    constructor(private dialog: MatDialog) { }

    public confirm(title: string): Observable<boolean> {

        let dialogRef: MatDialogRef<ConfirmComponent>;

        dialogRef = this.dialog.open(ConfirmComponent);
        dialogRef.componentInstance.title = title;

        return dialogRef.afterClosed();
    }

}
