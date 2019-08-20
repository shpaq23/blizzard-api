import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

// mounts
export interface MountList {
  id: number;
  name: string;
  detailsUrl: string;
  details: MountDetails;
  loaded: boolean;
  error: string;
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
export interface MountDetails {
  displays: MountAssets[];
  description: string;
  source: string;
}
interface MountDetailsResponse {
  creature_displays: {
    key: {
      href: string;
    };
  }[];
  description: string;
  source: {
    name: string;
    type: string;
  };
}
interface MountAssetsResponse {
  _links: {
    self: {
      href: string;
    };
  };
  assets: {
    key: string;
    value: string;
  }[];
}
export interface MountAssets {
  portrait: string;
  rotate: string;
  zoom: string;
}

// pets
export interface PetList {
  id: number;
  name: string;
  detailsUrl: string;
  details: PetDetails;
}
interface PetListResponse {
  _links: {
    self: {
      href: string;
    };
  };
  pets: {
    key: {
      href: string;
    };
    name: string;
    id: number;
  }[];
}
export interface PetDetails {
  id: any;
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
  public getMountDetails(url: string): Observable<MountDetailsResponse> {
    return this.http.get<MountDetailsResponse>(url,
      {params: {locale: this.locale}});
  }
  public getMountAssets(url: string): Observable<MountAssetsResponse> {
    return this.http.get<MountAssetsResponse>(url,
      {params: {locale: this.locale}});
  }
  public getPetList(): Observable<PetListResponse> {
    return this.http.get<PetListResponse>(this.apiUrl + '/data/wow/pet/index',
      {params: {namespace: this.namespace, locale: this.locale}});
  }
}
