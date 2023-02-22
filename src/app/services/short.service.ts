import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateLink } from '../model/create-link.model';
import { Observable } from 'rxjs';
import { CreateLinkResponse } from '../model/create-link-response.model';
import { ExistsResponse } from '../model/exists-response.model';
import { StatusResponse } from '../model/status-response.model';
import { UserLinksResponse } from '../model/user-links-response.model';
import { ConfigService } from './config.service';
import { Image } from '../model/image.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShortService {
  private readonly baseUrl;

  constructor(private http: HttpClient, configService: ConfigService) {
    this.baseUrl = configService.config.apiConfig.baseUrl;
  }

  public getUserLinks(): Observable<UserLinksResponse> {
    return this.http.get<UserLinksResponse>(`${this.baseUrl}/user/links`);
  }

  public shortenUrl(createLink: CreateLink): Observable<CreateLinkResponse> {
    return this.http.post<CreateLinkResponse>(
      `${this.baseUrl}/link`,
      createLink
    );
  }

  public linkExists(shortUrl: string): Observable<ExistsResponse> {
    return this.http.get<ExistsResponse>(
      `${this.baseUrl}/link/${shortUrl}/exists`
    );
  }

  public deleteLink(shortUrl: string): Observable<StatusResponse> {
    return this.http.delete<StatusResponse>(`${this.baseUrl}/link/${shortUrl}`);
  }

  public getBackgroundImage(): Observable<Image> {
    return this.http
      .get<any>(`${this.baseUrl}/unsplash/image`)
      .pipe(
        map(
          (img) =>
            new Image(
              img.image_url,
              img.photographer_name,
              img.photographer_username,
              img.updated_at,
              img.expiration_duration
            )
        )
      );
  }

  public clearBackgroundImage(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/unsplash/clear`);
  }
}
