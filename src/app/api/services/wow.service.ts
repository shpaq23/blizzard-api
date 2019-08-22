import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

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
  details?: PetDetails;
  loaded?: boolean;
  error?: string;
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
  description: string;
  type: string;
  display: string;
  isCapturable: boolean;
  isTradable: boolean;
  isBattlePet: boolean;
  isAllianceOnly: boolean;
  isHordeOnly: boolean;
  abilities: any[];
  source: string;
  icon: string;
}
interface PetDetailsResponse {
  _links: {
    self: {
      href: string;
    };
  };
  id: number;
  name: string;
  creature_display: {
    key: {
      href: string;
    };
  };
  battle_pet_type: {
    type: string;
    name: string;
  };
  description: string;
  is_capturable: boolean;
  is_tradable: boolean;
  is_battlepet: boolean;
  is_alliance_only: boolean;
  is_horde_only: boolean;
  abilities: {
    ability: {
      key: {
        href: string;
      };
      name: string;
      id: number
    };
    slot: number;
    required_level: number
  }[];
  source: {
    type: string;
    name: string;
  };
  icon: string;
}


export interface RealmList {
  type: string;
  population: string;
  queue: boolean;
  status: boolean;
  name: string;
  slug: string;
  battlegroup: string;
  locale: string;
  timezone: string;
  connected_realms: string[];
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
  public getPetDetails(url: string): Observable<PetDetailsResponse> {
    return this.http.get<PetDetailsResponse>(url,
      {params: {locale: this.locale}});
  }
  public getPetDisplay(url: string): Observable<{assets: {key: string, value: string}[]}> {
    return this.http.get<{assets: {key: string, value: string}[]}>(url,
      {params: {locale: this.locale}});
  }
  public getPetAbility(url: string): Observable<any> {
    return this.http.get(url);
  }
  public characterExist(realm: string, name: string): Observable<boolean> {
    return this.http.get<boolean>(this.apiUrl + `/wow/character/${realm}/${name}`,
      {params: {locale: this.locale}, observe: 'response'}).pipe(
        map(response => response.ok));
  }
  public getRealmList(): Observable<RealmList[]> {
    return this.http.get<{realms: RealmList[]}>(this.apiUrl + '/wow/realm/status',
      {params: {locale: this.locale}}).pipe(map(realm => realm.realms));
  }
}
