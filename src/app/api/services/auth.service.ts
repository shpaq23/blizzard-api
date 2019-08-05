import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'https://eu.battle.net';
  private clientID = '116e138a3d4947cfb4d74dacfbf86e81';
  private clientSecret = 'QyVNxAV3NxUSn3WXjECMXfrJOZogYm51';


  constructor(private http: HttpClient) { }

  public authorize(): Observable<AuthResponse> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<AuthResponse>(this.authUrl + '/oauth/token', 'grant_type=client_credentials', {headers});
  }

}
