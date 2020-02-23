import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateLink} from './model/create-link.model';
import {Observable} from 'rxjs';
import {CreateLinkResponse} from './model/create-link-response.model';
import {ExistsResponse} from "./model/exists-response.model";

@Injectable({
  providedIn: 'root'
})
export class ShortService {

  constructor(private http: HttpClient) {
  }

  public shortenUrl(createLink: CreateLink): Observable<CreateLinkResponse> {
    return this.http.post<CreateLinkResponse>('https://peg.nu/api/link', createLink);
  }

  public linkExists(shortUrl: string): Observable<ExistsResponse> {
    return this.http.get<ExistsResponse>(`https://peg.nu/api/link/${shortUrl}/exists`)
  }
}
