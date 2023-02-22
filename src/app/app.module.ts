import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { FormsModule } from '@angular/forms';
import { ApplicationRef, DoBootstrap, NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ShortComponent } from './pages/short/short.component';
import { ShortService } from './services/short.service';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { ClipboardModule } from 'ngx-clipboard';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { OverrideDialogComponent } from './components/override-dialog-component/override-dialog.component';
import { UserLinksComponent } from './pages/user-links/user-links.component';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
import { ConfirmDeleteLinkComponent } from './components/confirm-delete-link-dialog/confirm-delete-link.component';
import { ConfigService } from './services/config.service';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    ShortComponent,
    OverrideDialogComponent,
    UserLinksComponent,
    ConfirmDeleteLinkComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ClipboardModule,
    FormsModule,
    HttpClientModule,
    KeycloakAngularModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService,
    },
    ShortService,
  ],
})
export class AppModule implements DoBootstrap {
  constructor(private configService: ConfigService) {}

  ngDoBootstrap(app: ApplicationRef) {
    keycloakService
      .init({
        config: this.configService.config.keycloakConfig,
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false,
        },
        enableBearerInterceptor: true,
        bearerExcludedUrls: ['/assets'],
      })
      .then(() => {
        app.bootstrap(AppComponent);
      })
      .catch((error) =>
        console.error('[ngDoBootstrap] keycloak init failed', error)
      );
  }
}
