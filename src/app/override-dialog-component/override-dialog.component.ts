import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KeycloakService } from 'keycloak-angular';
import { ExistsResponse } from '../short/model/exists-response.model';

@Component({
  selector: 'app-override-dialog-component',
  templateUrl: './override-dialog.component.html',
  styleUrls: ['./override-dialog.component.scss'],
})
export class OverrideDialogComponent {
  public hasGlobalOverridePermissions: boolean = false;
  public canOverride: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ExistsResponse,
    private dialogRef: MatDialogRef<OverrideDialogComponent>,
    private keycloak: KeycloakService
  ) {
    this.hasGlobalOverridePermissions =
      keycloak.getUserRoles().filter((role) => role === 'PegNu-Short.OVERWRITE')
        .length > 0;

    if (this.hasGlobalOverridePermissions) {
      this.canOverride = true;
      return;
    }

    keycloak.loadUserProfile().then((profile) => {
      this.canOverride =
        this.hasGlobalOverridePermissions || profile.id == data.user_id;
    });
  }
}
