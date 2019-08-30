import {WowEffects} from './wow.effects';
import {Observable} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import {TestScheduler} from 'rxjs/testing';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialWowState, WowState} from '../state/wow.state';
import {
  MountAssets, MountAssetsResponse,
  MountDetails,
  MountDetailsResponse,
  MountList,
  MountListResponse, PetList, PetListResponse,
  WowService
} from '../../api/services/wow.service';
import {
  GetMountDetails,
  GetMountDetailsSuccess,
  GetMountList,
  GetMountListFail,
  GetMountListSuccess, GetPetList, GetPetListFail, GetPetListSuccess
} from '../actions/wow.actions';
import {getMount} from '../selectors/wow.selectors';

describe('WowEffects', () => {
  let effects: WowEffects;
  let mockWowService;
  let actions$: Observable<Action>;
  let scheduler: TestScheduler;
  let mockStore: MockStore<WowState>;
  const initWowState: WowState = initialWowState;

  beforeEach(() => {
    mockWowService = jasmine.createSpyObj(['getMountList', 'getMountDetails',
      'getMountAssets', 'getPetList', 'getPetDetails', 'getPetDisplay']);
    TestBed.configureTestingModule({
      providers: [
        WowEffects,
        provideMockStore<WowState>({initialState: initWowState}),
        provideMockActions(() => actions$),
        {provide: WowService, useValue: mockWowService}
      ]
    });
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    effects = TestBed.get(WowEffects);
    mockStore = TestBed.get<Store<WowState>>(Store);
  });
  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
  describe('getMountList', () => {
    let mountListResponses: MountListResponse;
    let mountLists: MountList[];
    beforeEach(() => {
      mountListResponses = {
        mounts: [
          {id: 1, name: 'name1', key: {href: 'key1'}},
          {id: 2, name: 'name2', key: {href: 'key2'}},
        ],
        _links:
          {
            self: {
              href: 'links'
            }
          }
      };
      mountLists = [
        {id: 1, name: 'name1', detailsUrl: 'key1', loaded: false, error: ''},
        {id: 2, name: 'name2', detailsUrl: 'key2', loaded: false, error: ''}
      ];
    });
    it('should return GetMountListSuccess on success', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action = new GetMountList();
        const outcome = new GetMountListSuccess(mountLists);

        actions$ = hot('5ms a', {a: action});
        mockWowService.getMountList.and.returnValue(cold('1s k|', {k: mountListResponses}));

        const expected = '5ms 1s c';

        expectObservable(effects.getMountList).toBe(expected, {c: outcome});
      });
    });
    it('should return GetMountListFail on fail', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const errorMessage = 'error message';
        const action = new GetMountList();
        const outcome = new GetMountListFail(errorMessage);

        actions$ = hot('5ms a', {a: action});
        mockWowService.getMountList.and.returnValue(cold('1s #', null, errorMessage));

        const expected = '5ms 1s c';

        expectObservable(effects.getMountList).toBe(expected, {c: outcome});
      });
    });
  });
  xdescribe('getMountDetails', () => {
    it('should return GetMountDetailsSuccess on success', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const id = 1;
        const mountListBefore: MountList = {
          id: 1, name: 'name1', detailsUrl: 'key1', loaded: false, error: ''
        };
        const mountDetailsResponse: MountDetailsResponse = {
          creature_displays: [{key: {href: 'key'}}],
          description: 'desc',
          source: {name: 'name', type: 'type'}
        };
        const mountAssetsResponse: MountAssetsResponse = {
          _links: {self: {href: ''}},
          assets: [
            {key: 'portrait', value: 'portrait'},
            {key: 'rotate', value: 'rotate'},
            {key: 'zoom', value: 'zoom'}
            ]
        };
        const mountAssets: MountAssets[] = [
          {zoom: 'zoom', rotate: 'rotate', portrait: 'portrait'}
          ];
        const mountDetails: MountDetails = {
          description: mountDetailsResponse.description,
          source: mountDetailsResponse.source.name,
          displays: mountAssets
        };
        const mountListAfter: MountList = {
          id: 1, name: 'name1', detailsUrl: 'key1', loaded: true, error: '', details: mountDetails
        };

        const action = new GetMountDetails(id);
        const outcome = new GetMountDetailsSuccess(mountListAfter);

        mockStore.overrideSelector(getMount(id), mountListBefore);

        actions$ = hot('1s a', {a: action});
        // mockWowService.getMountDetails.and.returnValue(cold('1s b|', {b: mountDetailsResponse}));
        // mockWowService.getMountAssets.and.returnValue(cold('1s c|', {c: mountAssetsResponse}));


        const expected = '1s d';
        expectObservable(effects.getMountDetails).toBe(expected, {d: outcome});
      });
    });
    it('should return GetMountDetailsFail on fail', () => {

    });
  });
  describe('getPetList', () => {
    it('should return GetPetListSuccess on success', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const petList: PetList[] = [
          {id: 1, name: '', detailsUrl: ''},
          {id: 1, name: '', detailsUrl: ''}
        ];
        const petListResponse: PetListResponse = {
          _links: {self: {href: ''}},
          pets: [
            {id: 1, name: '', key: {href: ''}},
            {id: 1, name: '', key: {href: ''}}
          ]
        };

        const action = new GetPetList();
        const outcome = new GetPetListSuccess(petList);

        actions$ = hot('-a', {a: action});
        mockWowService.getPetList.and.returnValue(cold('-b|', {b: petListResponse}));
        const expected = '--c';
        expectObservable(effects.getPetList).toBe(expected, {c: outcome});

      });
    });
    it('should return GetPetListFail on fail', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {

        const error = {error: {error_description: 'error message'}};
        const action = new GetPetList();
        const outcome = new GetPetListFail(error.error.error_description);


        actions$ = hot('-a', {a: action});
        mockWowService.getPetList.and.returnValue(cold('-#', null, error));
        const expected = '--c';
        expectObservable(effects.getPetList).toBe(expected, {c: outcome});


      });
    });

  });
});
