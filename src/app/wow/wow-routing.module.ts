import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WowComponent} from './wow.component';
import {MountsComponent} from './mounts/mounts.component';
import {MountsDetailsComponent} from './mounts-details/mounts-details.component';
import {PetsComponent} from './pets/pets.component';
import {PetsDetailsComponent} from './pets-details/pets-details.component';


const routes: Routes = [
  {
    path: 'wow',
    component: WowComponent,
    children: [
      {
        path: 'mounts',
        component: MountsComponent,
        children: [ { path: ':id', component: MountsDetailsComponent } ]
      },
      {
        path: 'pets',
        component: PetsComponent,
        children: [ { path: ':id', component: PetsDetailsComponent } ]
      },
      {path: '', redirectTo: 'mounts', pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WowRoutingModule { }
