
import {AuthEffects} from './auth.effects';
import {AuthResponse, AuthService} from '../../api/services/auth.service';
import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Action} from '@ngrx/store';
import {GetToken, GetTokenFail, GetTokenSuccess, StartSpinner, StopSpinner} from '../actions/auth.actions';
import {TestScheduler} from 'rxjs/testing';
import {Observable} from 'rxjs';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let mockAuthService;
  let router: Router;
  let actions$: Observable<Action>;
  let scheduler: TestScheduler;
  const token: AuthResponse = {token_type: '', scope: '', expires_in: 0, access_token: ''};

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj(['authorize']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {provide: AuthService, useValue: mockAuthService}
      ]
    });

    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    effects = TestBed.get(AuthEffects);
    router = TestBed.get(Router);

  });
  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
  describe('getToken', () => {
    it('should return GetTokenSuccess action with token on success',  () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const action = new GetToken();
        const outcome = new GetTokenSuccess(token);

        actions$ = hot('5ms a', {a: action});
        mockAuthService.authorize.and.returnValue(cold('1s k|', {k: token}));

        const expected = '5ms 1s z';

        expectObservable(effects.getToken).toBe(expected, {z: outcome});

      });
    });
    it('should return GetTokenFail action with error on error', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const errorMessage = 'error message';
        const action = new GetToken();
        const outcome = new GetTokenFail(errorMessage);

        actions$ = hot('5ms a', {a: action});
        mockAuthService.authorize.and.returnValue(cold('1s #', null, errorMessage));

        const expected = '5ms 1s z';

        expectObservable(effects.getToken).toBe(expected, {z: outcome});

      });
    });
  });
  describe('showSpinner', () => {
    it('should return StartSpinner if GetToken action triggered', () => {
      scheduler.run(({hot, expectObservable}) => {
        const action = new GetToken();
        const outcome = new StartSpinner();

        actions$ = hot('-a', {a: action});
        const expected = '-b';

        expectObservable(effects.showSpinner).toBe(expected, {b: outcome});
      });
    });
  });
  describe('hideSpinner', () => {
    it('should return StopSpinner if GetTokenFail or GetTokenSuccess action triggered', () => {
      scheduler.run(({hot, expectObservable}) => {
        const action1 = new GetTokenSuccess(token);
        const action2 = new GetTokenFail('error message');
        const outcome = new StopSpinner();

        const expected = '-b';
        actions$ = hot('-a', {a: action1});
        expectObservable(effects.hideSpinner).toBe(expected, {b: outcome});



        actions$ = hot('-a', {a: action2});
        expectObservable(effects.hideSpinner).toBe(expected, {b: outcome});

      });
    });
  });


});

