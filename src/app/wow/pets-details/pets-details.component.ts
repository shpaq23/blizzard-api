import { Component, OnInit } from '@angular/core';
import {PetList, WowService} from '../../api/services/wow.service';
import {WowState} from '../../store/state/wow.state';
import {Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {GALLERY_CONF, GALLERY_IMAGE} from 'ngx-image-gallery';
import {getPet} from '../../store/selectors/wow.selectors';
import {filter} from 'rxjs/operators';
import {GetPetDetails} from '../../store/actions/wow.actions';

@Component({
  selector: 'app-pets-details',
  templateUrl: './pets-details.component.html',
  styleUrls: ['./pets-details.component.scss']
})
export class PetsDetailsComponent implements OnInit {

  pet: PetList;
  constructor(private wowStore: Store<WowState>,
              private activatedRoute: ActivatedRoute,
              private wowService: WowService) { }
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
      .subscribe(data => {
        const petId = +data.id;
        if (petId) {
          this.wowStore.select(getPet(petId)).pipe(filter(pet => pet.loaded))
            .subscribe(pet => {
              console.log(this.pet);
              this.pet = pet;
              this.galleryImages = [{url: this.pet.details.display}];
              this.wowService.getPetAbility(this.pet.details.abilities[0].ability.key.href)
                .subscribe(data2 => console.log(data2));
            });
          this.wowStore.dispatch(new GetPetDetails(petId));
        }
      });
  }

}
