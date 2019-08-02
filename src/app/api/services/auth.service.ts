import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://eu.battle.net';
  private clientID = '116e138a3d4947cfb4d74dacfbf86e81';
  private clientSecret = 'QyVNxAV3NxUSn3WXjECMXfrJOZogYm51';
  constructor(private http: HttpClient) { }

  public authorize(): Observable<AuthResponse> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<AuthResponse>(this.url + '/oauth/token', 'grant_type=client_credentials', {headers});
  }
  public validateToken(token: string): Observable<boolean> {
    // const token = (JSON.parse(localStorage.getItem('auth')) as AuthResponse).access_token;
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');

    return this.http.post<boolean>(this.url + '/oauth/check_token', {token}, {headers});
  }
  public getMountList(token: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json');

    return this.http.get<any>('https://eu.api.blizzard.com/data/wow/mount/index?namespace=static-eu&locale=en_GB', {headers});
  }
}
