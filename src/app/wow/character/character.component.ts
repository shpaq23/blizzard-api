import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RealmList, WowService} from '../../api/services/wow.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  form: FormGroup;
  availableRealms: RealmList[] = [];
  filteredOptions: Observable<RealmList[]>;
  loaded = false;
  constructor(private wowService: WowService) { }

  ngOnInit() {
    this.form = new FormGroup({
      realm: new FormControl(''),
      name: new FormControl('', {validators: [Validators.required]}),
    });
    this.wowService.getRealmList()
      .subscribe(data => {
        this.availableRealms = data;
        console.log(this.availableRealms);
        this.loaded = true;
        const realmControl = this.form.get('realm');
        realmControl.setValidators([Validators.required, this.realmValidator(this.availableRealms)]);
        this.filteredOptions = realmControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
      });
  }
  realmValidator(availableRealms: RealmList[]) {
    return (control: FormControl) => {
      return availableRealms.find(realm => realm === control.value) ?
        null : {error: 'Realm Not Found'};
    };
  }
  private _filter(name: string): RealmList[] {
    if (typeof name === 'string') {
      console.log(name);
      const filterValue = name.toLowerCase();
      return this.availableRealms.filter(realm => realm.name.toLowerCase().includes(filterValue));
    }
  }
  displayFn(realm?: RealmList): string | undefined {
    return realm ? realm.name : undefined;
  }
  onSubmit() {
    return null;
  }
}
