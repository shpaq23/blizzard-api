import { Component, OnInit } from '@angular/core';
import {WowState} from '../../store/state/wow.state';
import {select, Store} from '@ngrx/store';
import {SpinnerState} from '../../store/state/spinner.state';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {getMount} from '../../store/selectors/wow.selectors';
import {WowService} from '../../api/services/wow.service';

@Component({
  selector: 'app-mounts-details',
  templateUrl: './mounts-details.component.html',
  styleUrls: ['./mounts-details.component.scss']
})
export class MountsDetailsComponent implements OnInit {

  error$: Observable<string>;
  spinner$: Observable<boolean>;
  mountDetails: string;
  mountId: number;

  constructor(private wowStore: Store<WowState>,
              private spinnerStore: Store<SpinnerState>,
              private activatedRoute: ActivatedRoute,
              private wowService: WowService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe( data => {
        this.mountId = +data.id;
        console.log(this.mountId);
        this.wowStore.pipe(select(getMount(this.mountId)))
          .subscribe(mount => {
            console.log(mount);
            this.wowService.getMountDetails(mount.details)
              .subscribe(response => {
                console.log(response);
              });
          });
      });
  }

}
