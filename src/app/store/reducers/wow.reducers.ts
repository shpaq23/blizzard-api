import {initialWowState, WowState} from '../state/wow.state';
import {WowActions, WowActionsTypes} from '../actions/wow.actions';

export function wowReducer(state = initialWowState, action: WowActions): WowState {
  switch (action.type) {
    case WowActionsTypes.GetMountListSuccess:
      return {
        ... state,
        mounts: action.payload,
        error: ''
      };
    case WowActionsTypes.GetMountListFail:
      return {
        ... state,
        error: action.payload
      };
    default:
      return state;
  }
}
