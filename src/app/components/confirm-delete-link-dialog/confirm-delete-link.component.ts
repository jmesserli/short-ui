import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Link } from '../../model/link.model';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-confirm-delete-link',
  templateUrl: './confirm-delete-link.component.html',
  styleUrls: ['./confirm-delete-link.component.scss'],
})
export class ConfirmDeleteLinkComponent {
  baseUrl: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Link,
    config: ConfigService
  ) {
    this.baseUrl = config.config.shortlinkConfig.baseUrl;
  }
}
