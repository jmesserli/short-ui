import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {NgModule, DoBootstrap, ApplicationRef} from '@angular/core';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {ShortComponent} from './short/short.component';
import {ShortService} from './short/short.service';
import {MatCard, MatCardModule} from '@angular/material';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [AppComponent, ShortComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    KeycloakAngularModule,
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService,
    },
    ShortService
  ],
  entryComponents: [AppComponent],
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(app: ApplicationRef) {
    keycloakService
      .init({
        config: {
          clientId: 'short',
          url: 'https://id.peg.nu/auth/',
          realm: 'PegNu',
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false,
        },
        enableBearerInterceptor: true,
        bearerExcludedUrls: ['/assets'],
      })
      .then(() => {
        console.log('[ngDoBootstrap] bootstrapping');

        app.bootstrap(AppComponent);
      })
      .catch(error =>
        console.error('[ngDoBootstrap] keycloak init failed', error)
      );
  }
}
