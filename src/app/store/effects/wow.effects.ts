import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {MountDetails, MountList, WowService} from '../../api/services/wow.service';
import {Observable} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {
  GetMountDetails,
  GetMountDetailsFail,
  GetMountDetailsSuccess,
  GetMountListFail,
  GetMountListSuccess,
  WowActionsTypes
} from '../actions/wow.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {WowState} from '../state/wow.state';
import {getMount} from '../selectors/wow.selectors';
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
      catchError(err => of(new GetMountListFail(err.error.error_description)))
    )));
  @Effect()
  getMountDetails: Observable<Action> = this.actions$.pipe(
    ofType(WowActionsTypes.GetMountDetails),
    map((action: GetMountDetails) => action.payload),
    mergeMap(id => this.wowStore.select(getMount(id)).pipe(
      first(),
      filter((mount: MountList) => !mount.loaded),
      mergeMap((mount: MountList) => this.wowService.getMountDetails(mount.detailsUrl).pipe(
        map(mountResponse => ({
          description: mountResponse.description,
          source: mountResponse.source.name,
          displays: mountResponse.creature_displays.map(data => data.key.href)})
        ),
        map((mountDetails: MountDetails) => ({... mount, details: mountDetails, loaded: true, error: ''})),
        catchError(err => of({... mount, loaded: false, error: err.error.error_description || err.statusText}))
      )),
    )),
    map((mount: MountList) => mount.error ? (new GetMountDetailsFail(mount)) : (new GetMountDetailsSuccess(mount))),
  );
}
