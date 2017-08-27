import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'irl-confirm-component',
    template: `
        <h2 md-dialog-title>Logout?</h2>
        <md-dialog-content>
            <p>{{ title }}</p>
        </md-dialog-content>
        <button type="button" color="primary" md-raised-button 
            (click)="dialogRef.close(true)">OK</button>
        <button type="button" md-raised-button color="accent"
            (click)="dialogRef.close()">Cancel</button>
    `,
})
export class ConfirmComponent {

    public title: string;

    constructor(public dialogRef: MdDialogRef<ConfirmComponent>) {

    }
    
}
