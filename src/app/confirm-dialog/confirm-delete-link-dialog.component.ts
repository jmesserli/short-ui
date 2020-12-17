import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Link } from '../model/link.model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-delete-link-dialog.component.html',
  styleUrls: ['./confirm-delete-link-dialog.component.scss'],
})
export class ConfirmDeleteLinkDialog implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Link,
    private dialogRef: MatDialogRef<ConfirmDeleteLinkDialog>
  ) {}

  ngOnInit() {}
}
