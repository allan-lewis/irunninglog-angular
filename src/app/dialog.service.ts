import { Observable } from 'rxjs/Rx';
import { ConfirmDialog } from './dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

    constructor(private dialog: MdDialog) { }

    public confirm(title: string): Observable<boolean> {

        let dialogRef: MdDialogRef<ConfirmDialog>;

        dialogRef = this.dialog.open(ConfirmDialog);
        dialogRef.componentInstance.title = title;

        return dialogRef.afterClosed();
    }

}
