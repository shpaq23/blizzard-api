import {async, ComponentFixture, flush, TestBed} from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import {MatProgressSpinnerModule} from '@angular/material';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {AuthState, initialAuthState} from '../store/state/auth.state';
import {Action, Store} from '@ngrx/store';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable, of} from 'rxjs';
import {AuthActionsTypes, GetToken, GetTokenSuccess} from '../store/actions/auth.actions';
import {AuthResponse, AuthService} from '../api/services/auth.service';
import {AuthEffects} from '../store/effects/auth.effects';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authStore: MockStore<AuthState>;
  let actions$: Observable<Action>;
  let mockAuthService;
  let effects: AuthEffects;
  const authInitialState = initialAuthState;

  beforeEach(async(() => {
    mockAuthService = jasmine.createSpyObj(['authorize']);
    TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule],
      declarations: [ AuthComponent ],
      providers: [
        AuthEffects,
        provideMockStore<AuthState>({initialState: authInitialState}),
        provideMockActions(() => actions$),
        {provide: AuthService, useValue: mockAuthService},
      ]
    });
    authStore = TestBed.get<Store<AuthState>>(Store);
    fixture = TestBed.createComponent(AuthComponent);
    effects = TestBed.get(AuthEffects);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch GetToken OnInit', () => {
    const token: AuthResponse = {access_token: '', expires_in: 0, scope: '', token_type: ''};
    const action = new GetToken();
    const outcome = new GetTokenSuccess(token);
  });
});
