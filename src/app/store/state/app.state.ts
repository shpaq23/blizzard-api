import {AuthState} from './auth.state';
import {SpinnerState} from './spinner.state';
import {WowState} from './wow.state';

export interface AppState {
  auth: AuthState;
  spinner: SpinnerState;
  wow: WowState;
}
