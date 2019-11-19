import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {Image} from './image.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  backgroundImage$: Observable<Image>;
  backgroundUrlCss$: Observable<string>;

  constructor(private http: HttpClient) {
    this.backgroundImage$ = http.get<any>('https://peg.nu/api/unsplash/image').pipe(
      map(img => new Image(img.image_url, img.photographer_name, img.photographer_username)),
      shareReplay(1)
    );

    this.backgroundUrlCss$ = this.backgroundImage$.pipe(
      map((img: Image) => `url(${img.imageUrl})`)
    );
  }
}
