import { Component, OnInit } from '@angular/core';
import {WowState} from '../../store/state/wow.state';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {MountList} from '../../api/services/wow.service';
import {GetMountDetails} from '../../store/actions/wow.actions';
import {getMount} from '../../store/selectors/wow.selectors';
import {GALLERY_CONF, GALLERY_IMAGE} from 'ngx-image-gallery';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-mounts-details',
  templateUrl: './mounts-details.component.html',
  styleUrls: ['./mounts-details.component.scss']
})
export class MountsDetailsComponent implements OnInit {

  mount: MountList;
  constructor(private wowStore: Store<WowState>,
              private activatedRoute: ActivatedRoute) { }

  galleryImages: GALLERY_IMAGE[];
  galleryConfig: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
    showCloseControl: false,
    showThumbnails: false,
    imageBorderRadius: '20px',
    backdropColor: 'transparent',
    inline: true
  };

  ngOnInit() {
    this.activatedRoute.params
      .subscribe( data => {
        const mountId = +data.id;
        if (mountId) {
          this.wowStore.select(getMount(mountId)).pipe(filter(mount => mount.loaded))
            .subscribe(mount => {
              this.mount = mount;
              console.log(this.mount);
              this.galleryImages = this.mount.details.displays.map(asset => ({url: asset.zoom}));
            });
          this.wowStore.dispatch(new GetMountDetails(mountId));
        }
      });
  }
}
