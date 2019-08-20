import {Action} from '@ngrx/store';
import {MountList, PetList} from '../../api/services/wow.service';

export enum WowActionsTypes {
  GetMountList = '[wow] Get Mount List',
  GetMountListSuccess = '[wow] Get Mount List Success',
  GetMountListFail = '[wow] Get Mount List Fail',

  GetMountDetails = '[wow] Get Mount Details',
  GetMountDetailsSuccess = '[wow] Get Mount Details Success',
  GetMountDetailsFail = '[wow] Get Mount Details Fail',

  GetPetList = '[wow] Get Pet List',
  GetPetListSuccess = '[wow] Get Pet List Success',
  GetPetListFail = '[wow] Get Pet List Fail',


}
// mounts
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
export class GetMountDetails implements Action {
  public readonly type = WowActionsTypes.GetMountDetails;
  constructor(public payload: number) {}
}
export class GetMountDetailsSuccess implements Action {
  public readonly type = WowActionsTypes.GetMountDetailsSuccess;
  constructor(public payload: MountList) {}
}
export class GetMountDetailsFail implements Action {
  public readonly type = WowActionsTypes.GetMountDetailsFail;
  constructor(public payload: MountList) {}
}
// pets
export class GetPetList implements Action {
  public readonly type = WowActionsTypes.GetPetList;
}
export class GetPetListSuccess implements Action {
  public readonly type = WowActionsTypes.GetPetListSuccess;
  constructor(public payload: PetList[]) {}
}
export class GetPetListFail implements Action {
  public readonly type = WowActionsTypes.GetPetListFail;
  constructor(public payload: string) {}
}

export type WowActions = GetMountList | GetMountListSuccess | GetMountListFail
  | GetMountDetails | GetMountDetailsSuccess | GetMountDetailsFail
  | GetPetList | GetPetListSuccess | GetPetListFail;
