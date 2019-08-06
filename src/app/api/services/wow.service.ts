import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface MountList {
  id: number;
  name: string;
  details: string;
}
interface MountListResponse {
  mounts: {
    id: number;
    key: {
      href: string;
    };
    name: string;
  }[];
  _links: {
    self: {
      href: string;
    };
  };
}
@Injectable({
  providedIn: 'root'
})
export class WowService {

  private apiUrl = 'https://eu.api.blizzard.com';
  private namespace = 'static-eu';
  private locale = 'en_GB';

  constructor(private http: HttpClient) { }


  public getMountList(): Observable<MountListResponse> {
    return this.http.get<MountListResponse>(this.apiUrl + '/data/wow/mount/index',
      {params: {namespace: this.namespace, locale: this.locale}});
  }
}
