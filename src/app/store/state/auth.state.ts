import {AuthResponse} from '../../api/services/auth.service';

export interface AuthState {
  auth: AuthResponse;
  error: string;
  loading: boolean;
}
export const initialAuthState: AuthState = {
  auth: localStorage.getItem('auth') ?
    JSON.parse(localStorage.getItem('auth')) :
    {access_token: null, token_type: null, expires_in: null},
  error: '',
  loading: false
};
