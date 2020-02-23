import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {KeycloakService} from "keycloak-angular";
import {ExistsResponse} from "../short/model/exists-response.model";

@Component({
  selector: 'app-override-dialog-component',
  templateUrl: './override-dialog.component.html',
  styleUrls: ['./override-dialog.component.scss']
})
export class OverrideDialogComponent {
  public mayOverride: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ExistsResponse,
              private dialogRef: MatDialogRef<OverrideDialogComponent>,
              private keycloak: KeycloakService) {
    this.mayOverride = keycloak.getUserRoles().filter(role => role === "PegNu-Short.OVERWRITE").length > 0
  }
}
