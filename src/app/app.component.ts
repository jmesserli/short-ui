import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Image} from './image.model';
import {KeycloakService} from 'keycloak-angular';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  backgroundImage$: Observable<Image>;
  backgroundUrlCss$: Observable<string>;
  isImageClearingAllowed: boolean;
  imageReloading: boolean;

  constructor(private http: HttpClient,
              private keycloak: KeycloakService) {
    this.backgroundImage$ = http.get<any>('https://peg.nu/api/unsplash/image').pipe(
      map(img => new Image(img.image_url, img.photographer_name, img.photographer_username, img.updated_at, img.expiration_duration)),
      shareReplay(1),
    );

    this.backgroundUrlCss$ = this.backgroundImage$.pipe(
      map((img: Image) => `url(${img.imageUrl})`),
    );

    this.isImageClearingAllowed = keycloak.getUserRoles().filter(role => role === 'PegNu-Short.CLEAR-BACKGROUND').length > 0;
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
