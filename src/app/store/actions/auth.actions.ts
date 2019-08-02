import {Action} from '@ngrx/store';
import {AuthResponse} from '../../api/services/auth.service';


export enum AuthActionsTypes {
    GetToken = '[Auth] Get Token',
    GetTokenSuccess = '[Auth] Get Token Success',
    GetTokenFail = '[Auth] Get Token Fail',

    ValidateToken = '[Auth] Validate Token',
    ValidateTokenSuccess = '[Auth] Validate Token Success',
    ValidateTokenFail = '[Auth] Validate Token Fail'
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

export class ValidateToken implements Action {
  public readonly type = AuthActionsTypes.ValidateToken;
}
export class ValidateTokenSuccess implements Action {
  public readonly type = AuthActionsTypes.ValidateTokenSuccess;
  constructor(public payload: boolean) {}
}
export class ValidateTokenFail implements  Action {
  public readonly type = AuthActionsTypes.ValidateTokenFail;
  constructor(public payload: string) {}
}

export type AuthActions = GetToken | GetTokenSuccess | GetTokenFail |
  ValidateToken | ValidateTokenSuccess | ValidateTokenFail;
