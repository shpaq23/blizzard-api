import {Action} from '@ngrx/store';
import {MountList} from '../../api/services/wow.service';

export enum WowActionsTypes {
  GetMountList = '[wow] Get Mount List',
  GetMountListSuccess = '[wow] Get Mount List Success',
  GetMountListFail = '[wow] Get Mount List Fail',
}
export class GetMountList implements Action {
  public readonly type = WowActionsTypes.GetMountList;
}
export class GetMountListSuccess implements Action {
  public readonly type = WowActionsTypes.GetMountListSuccess;
  constructor(public payload: MountList[]) {}
}
export class GetMountListFail implements Action {
  public readonly type = WowActionsTypes.GetMountListFail;
  constructor(public payload: string) {}
}

export type WowActions = GetMountList | GetMountListSuccess | GetMountListFail;
