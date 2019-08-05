import {initialSpinnerState, SpinnerState} from '../state/spinner.state';
import {SpinnerActions, SpinnerActionsTypes} from '../actions/spinner.actions';

export function spinnerReducer(state = initialSpinnerState, action: SpinnerActions): SpinnerState {
  switch (action.type) {
      case SpinnerActionsTypes.HideSpinner:
        return {... state, show: false};
      case SpinnerActionsTypes.ShowSpinner:
        return {... state, show: true};
      default:
        return state;
  }
}
