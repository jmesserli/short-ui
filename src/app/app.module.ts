import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule, DoBootstrap, ApplicationRef } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ShortComponent } from './short/short.component';

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [AppComponent, ShortComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    KeycloakAngularModule,
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService,
    },
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
