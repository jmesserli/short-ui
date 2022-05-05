import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateLink } from '../../model/create-link.model';
import { Observable } from 'rxjs';
import { CreateLinkResponse } from '../../model/create-link-response.model';
import { ExistsResponse } from '../../model/exists-response.model';
import { StatusResponse } from '../../model/status-response.model';
import { UserLinksResponse } from '../../model/user-links-response.model';

@Injectable({
  providedIn: 'root',
})
export class ShortService {
  constructor(private http: HttpClient) {}

  public getUserLinks(): Observable<UserLinksResponse> {
    return this.http.get<UserLinksResponse>('https://peg.nu/api/user/links');
  }

  public shortenUrl(createLink: CreateLink): Observable<CreateLinkResponse> {
    return this.http.post<CreateLinkResponse>(
      'https://peg.nu/api/link',
      createLink
    );
  }

  public linkExists(shortUrl: string): Observable<ExistsResponse> {
    return this.http.get<ExistsResponse>(
      `https://peg.nu/api/link/${shortUrl}/exists`
    );
  }

  public deleteLink(shortUrl: string): Observable<StatusResponse> {
    return this.http.delete<StatusResponse>(
      `https://peg.nu/api/link/${shortUrl}`
    );
  }
}
