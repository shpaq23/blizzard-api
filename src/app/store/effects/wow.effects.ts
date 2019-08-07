import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {MountList, WowService} from '../../api/services/wow.service';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import {GetMountListFail, GetMountListSuccess, WowActionsTypes} from '../actions/wow.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

@Injectable()
export class WowEffects {
  constructor(private actions$: Actions,
              private wowService: WowService) {}
  @Effect()
  getMountList: Observable<Action> = this.actions$.pipe(
    ofType(WowActionsTypes.GetMountList),
    mergeMap(() => this.wowService.getMountList().pipe(
      map(mountListResponse => mountListResponse.mounts
            .map(data => ({id: data.id, name: data.name, details: data.key.href}))),
      map((mountList: MountList[]) => (new GetMountListSuccess(mountList))),
      catchError(err => of(new GetMountListFail(err.error.error_description)))
    )));
}
