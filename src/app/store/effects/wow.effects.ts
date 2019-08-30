import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {MountAssets, MountDetails, MountList, PetDetails, PetList, WowService} from '../../api/services/wow.service';
import {forkJoin, Observable, throwError} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {
  GetMountDetails,
  GetMountDetailsFail,
  GetMountDetailsSuccess,
  GetMountListFail,
  GetMountListSuccess, GetPetDetailsFail, GetPetDetailsSuccess, GetPetListFail, GetPetListSuccess,
  WowActionsTypes
} from '../actions/wow.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {WowState} from '../state/wow.state';
import {getMount, getPet} from '../selectors/wow.selectors';
import {filter} from 'rxjs/internal/operators/filter';
import {first} from 'rxjs/internal/operators/first';

@Injectable()
export class WowEffects {
  constructor(private actions$: Actions,
              private wowService: WowService,
              private wowStore: Store<WowState>) {}
  @Effect()
  getMountList: Observable<Action> = this.actions$.pipe(
    ofType(WowActionsTypes.GetMountList),
    mergeMap(() => this.wowService.getMountList().pipe(
      map(mountListResponse => mountListResponse.mounts
            .map(data => ({id: data.id, name: data.name, detailsUrl: data.key.href, loaded: false, error: ''}))),
      map((mountList: MountList[]) => (new GetMountListSuccess(mountList))),
      catchError(err => of(new GetMountListFail(err)))
    )));
  @Effect()
  getMountDetails: Observable<Action> = this.actions$.pipe(
    ofType(WowActionsTypes.GetMountDetails),
    map((action: GetMountDetails) => action.payload),
    mergeMap(id => this.wowStore.select(getMount(id)).pipe(
      first(),
      filter((mount: MountList) => !mount.loaded),
      mergeMap((mount: MountList) => this.wowService.getMountDetails(mount.detailsUrl).pipe(
        map(detailsResponse => ({
          description: detailsResponse.description,
          source: detailsResponse.source.name,
          displays: forkJoin(detailsResponse.creature_displays.map(data => this.wowService.getMountAssets(data.key.href))).pipe(
            map(assetsResponses => assetsResponses.map(assetsResponse => {
                const mountAssets: MountAssets = {portrait: '', rotate: '', zoom: ''};
                assetsResponse.assets.forEach(row => mountAssets[row.key] = row.value);
                return mountAssets;
            })),
            catchError(err => throwError(err))
          )
        })),
        mergeMap(detailsResponse2 => detailsResponse2.displays.pipe(
          map((mountAssets: MountAssets[]) =>
            ({description: detailsResponse2.description, source: detailsResponse2.source, displays: mountAssets})),
          catchError(err => throwError(err))
        )),
        map((mountDetails: MountDetails) => ({... mount, details: mountDetails, loaded: true, error: ''})),
        catchError(err => of({... mount, loaded: false, error: err.error.error_description || err.statusText}))
      )),
      map((mount: MountList) => mount.error ? (new GetMountDetailsFail(mount)) : (new GetMountDetailsSuccess(mount))),
    )),
  );
  @Effect()
  getPetList: Observable<Action> = this.actions$.pipe(
    ofType(WowActionsTypes.GetPetList),
    mergeMap(() => this.wowService.getPetList().pipe(
      map(response => response.pets
        .map(pet => ({id: pet.id, name: pet.name, detailsUrl: pet.key.href}))
      ),
      map((petList: PetList[]) => (new GetPetListSuccess(petList))),
      catchError(err => of(new GetPetListFail(err.error.error_description)))
    )));
  @Effect()
  getPetDetails: Observable<Action> = this.actions$.pipe(
    ofType(WowActionsTypes.GetPetDetails),
    map((action: GetMountDetails) => action.payload),
    mergeMap(id => this.wowStore.select(getPet(id)).pipe(
      first(),
      filter((pet: PetList) => !pet.loaded),
      mergeMap(pet => this.wowService.getPetDetails(pet.detailsUrl).pipe(
        map(resp => ({description: resp.description, type: resp.battle_pet_type.name, display: resp.creature_display.key.href,
          isCapturable: resp.is_capturable, isTradable: resp.is_tradable, isBattlePet: resp.is_battlepet,
          isAllianceOnly: resp.is_alliance_only, isHordeOnly: resp.is_horde_only, abilities: resp.abilities,
          source: resp.source ? resp.source.name : 'unknown', icon: resp.icon})),
        catchError(err => throwError({id, error: err}))
      )),
      mergeMap((pet: PetDetails) => this.wowService.getPetDisplay(pet.display).pipe(
        map(image => ({...pet, display: image.assets[2].value})),
        catchError(err => throwError({id, error: err}))
      )),
      map(pet => (new GetPetDetailsSuccess({id, petDetails: pet}))),
      catchError(err => of(new GetPetDetailsFail({id, error: err})))
    )),
  );
}
