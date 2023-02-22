import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Image } from './model/image.model';
import { KeycloakService } from 'keycloak-angular';
import * as moment from 'moment';
import { ConfigService } from './services/config.service';
import { ShortService } from './services/short.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  backgroundImage$: Observable<Image>;
  backgroundUrlCss$: Observable<string>;
  isImageClearingAllowed: boolean;
  imageReloading: boolean;

  constructor(
    private http: HttpClient,
    private keycloak: KeycloakService,
    private configService: ConfigService,
    private shortService: ShortService
  ) {
    this.backgroundImage$ = this.shortService
      .getBackgroundImage()
      .pipe(shareReplay(1));

    this.backgroundUrlCss$ = this.backgroundImage$.pipe(
      map((img) => `url(${img.imageUrl})`)
    );

    this.isImageClearingAllowed =
      keycloak
        .getUserRoles()
        .filter((role) => role === 'PegNu-Short.CLEAR-BACKGROUND').length > 0;
  }

  ngOnInit(): void {
    const scripts = this.configService.config.additionalScripts;

    for (const script of scripts) {
      if (!script.enabled) {
        continue;
      }

      const scriptEl: HTMLScriptElement = document.createElement('script');
      scriptEl.src = script.url;

      for (const attribute of Object.getOwnPropertyNames(script.attributes)) {
        scriptEl.setAttribute(attribute, script.attributes[attribute]);
      }

      document.head.appendChild(scriptEl);
    }
  }

  clearImage() {
    this.imageReloading = true;

    this.shortService
      .clearBackgroundImage()
      .pipe(map((res) => res.status === 'ok'))
      .subscribe((success) => {
        if (!success) {
          this.imageReloading = false;
          return;
        }

        window.location.reload();
      });
  }

  getRelativeExpirationTime(
    updateTime: string,
    expirationDuration: number
  ): string {
    return moment(updateTime)
      .add(expirationDuration / 1000000, 'ms')
      .fromNow();
  }
}
