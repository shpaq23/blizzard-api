import {AuthState, initialAuthState} from '../state/auth.state';
import {AuthActions, AuthActionsTypes} from '../actions/auth.actions';

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionsTypes.GetTokenSuccess:
      return {
        ... state,
        auth: action.payload,
        error: ''
      };
    case AuthActionsTypes.GetTokenFail:
      return {
        ... state,
        error: action.payload
      };
  }
}
