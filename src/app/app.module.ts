import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ApplicationRef, DoBootstrap, NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ShortComponent } from './pages/short/short.component';
import { ShortService } from './services/short.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClipboardModule } from 'ngx-clipboard';
import { MatDialogModule } from '@angular/material/dialog';
import { OverrideDialogComponent } from './components/override-dialog-component/override-dialog.component';
import { UserLinksComponent } from './pages/user-links/user-links.component';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
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
