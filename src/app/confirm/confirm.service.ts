import { Observable } from 'rxjs/Rx';
import { ConfirmComponent } from './confirm.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfirmService {

    constructor(private dialog: MdDialog) { }

    public confirm(title: string): Observable<boolean> {

        let dialogRef: MdDialogRef<ConfirmComponent>;

        dialogRef = this.dialog.open(ConfirmComponent);
        dialogRef.componentInstance.title = title;

        return dialogRef.afterClosed();
    }

}
