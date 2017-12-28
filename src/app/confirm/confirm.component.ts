import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'irl-confirm-component',
    template: `
        <h2 mat-dialog-title>Logout?</h2>
        <mat-dialog-content>
            <p>{{ title }}</p>
        </mat-dialog-content>
        <button type="button" color="primary" mat-raised-button 
            (click)="dialogRef.close(true)">OK</button>
        <button type="button" mat-raised-button color="accent"
            (click)="dialogRef.close()">Cancel</button>
    `,
})
export class ConfirmComponent {

    public title: string;

    constructor(public dialogRef: MatDialogRef<ConfirmComponent>) {

    }
    
}
