import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Image } from './model/image.model';
import { KeycloakService } from 'keycloak-angular';
import * as moment from 'moment';
import { ConfigService } from './services/config.service';

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

  constructor(private http: HttpClient,
              private keycloak: KeycloakService,
              private configService: ConfigService) {
    this.backgroundImage$ = http.get<any>('https://peg.nu/api/unsplash/image').pipe(
      map(img => new Image(img.image_url, img.photographer_name, img.photographer_username, img.updated_at, img.expiration_duration)),
      shareReplay(1),
    );

    this.backgroundUrlCss$ = this.backgroundImage$.pipe(
      map((img: Image) => `url(${img.imageUrl})`),
    );

    this.isImageClearingAllowed = keycloak.getUserRoles().filter(role => role === 'PegNu-Short.CLEAR-BACKGROUND').length > 0;
  }

  ngOnInit(): void {
    const plausibleCfg = this.configService.config.analyticsConfig.plausible;

    if (!plausibleCfg.enabled) {
      return;
    }

    const script = document.createElement('script');
    script.src = plausibleCfg.scriptUrl;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-domain', plausibleCfg.domain);
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  clearImage() {
    this.imageReloading = true;

    this.http.get<any>('https://peg.nu/api/unsplash/clear').pipe(
      map(res => res.status === 'ok'),
    ).subscribe(success => {
      if (!success) {
        this.imageReloading = false;
        return;
      }

      window.location.reload();
    });
  }

  getRelativeExpirationTime(updateTime: string, expirationDuration: number): string {
    return moment(updateTime).add(expirationDuration / 1000000, 'ms').fromNow();
  }
}
