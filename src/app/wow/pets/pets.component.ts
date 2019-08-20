import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {PetList} from '../../api/services/wow.service';
import {Store} from '@ngrx/store';
import {WowState} from '../../store/state/wow.state';
import {SpinnerState} from '../../store/state/spinner.state';
import {getPetError, getPetList, getPetListLoaded} from '../../store/selectors/wow.selectors';
import {isSpinnerShowing} from '../../store/selectors/spinner.selectors';
import {GetPetList} from '../../store/actions/wow.actions';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {

  error$: Observable<string>;
  spinner$: Observable<boolean>;
  petList$: Observable<PetList[]>;
  loaded: boolean;
  constructor(private wowStore: Store<WowState>,
              private spinnerStore: Store<SpinnerState>) { }

  ngOnInit() {
    this.error$ = this.wowStore.select(getPetError);
    this.spinner$ = this.spinnerStore.select(isSpinnerShowing);
    this.petList$ = this.wowStore.select(getPetList);

    this.wowStore.select(getPetListLoaded)
      .subscribe(loaded => {
        this.loaded = loaded;
        if (!this.loaded) {
          this.wowStore.dispatch(new GetPetList());
        }
      });
  }
}
