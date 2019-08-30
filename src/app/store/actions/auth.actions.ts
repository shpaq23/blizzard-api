import {Action} from '@ngrx/store';
import {AuthResponse} from '../../api/services/auth.service';


export enum AuthActionsTypes {
    GetToken = '[Auth] Get Token',
    GetTokenSuccess = '[Auth] Get Token Success',
    GetTokenFail = '[Auth] Get Token Fail',

    StartSpinner = '[Auth] Show Spinner',
    StopSpinner = '[Auth] Hide Spinner'

}
export class GetToken implements Action {
  public readonly type = AuthActionsTypes.GetToken;
}
export class GetTokenSuccess implements Action {
  public readonly type = AuthActionsTypes.GetTokenSuccess;
  constructor(public payload: AuthResponse) {}
}
export class GetTokenFail implements Action {
  public readonly type = AuthActionsTypes.GetTokenFail;
  constructor(public payload: string) {}
}
export class StartSpinner implements Action {
  public readonly type = AuthActionsTypes.StartSpinner;
}
export class StopSpinner implements Action {
  public readonly type = AuthActionsTypes.StopSpinner;
}

export type AuthActions = GetToken | GetTokenSuccess | GetTokenFail
  | StartSpinner | StopSpinner;
