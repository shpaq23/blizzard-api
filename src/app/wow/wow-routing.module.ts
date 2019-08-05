import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WowComponent} from './wow.component';
import {MountsComponent} from './mounts/mounts.component';


const routes: Routes = [
  {
    path: 'wow',
    component: WowComponent,
    children: [
      {path: 'mounts', component: MountsComponent},
      {path: '', redirectTo: 'mounts', pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WowRoutingModule { }
