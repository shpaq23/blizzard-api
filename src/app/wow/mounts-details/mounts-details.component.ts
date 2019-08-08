import { Component, OnInit } from '@angular/core';
import {WowState} from '../../store/state/wow.state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MountList} from '../../api/services/wow.service';
import {GetMountDetails} from '../../store/actions/wow.actions';
import {getMount} from '../../store/selectors/wow.selectors';

@Component({
  selector: 'app-mounts-details',
  templateUrl: './mounts-details.component.html',
  styleUrls: ['./mounts-details.component.scss']
})
export class MountsDetailsComponent implements OnInit {

  mount$: Observable<MountList>;
  constructor(private wowStore: Store<WowState>,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe( data => {
        const mountId = +data.id;
        if (mountId) {
          this.mount$ = this.wowStore.select(getMount(mountId));
          this.wowStore.dispatch(new GetMountDetails(mountId));
        }
      });
  }
}
