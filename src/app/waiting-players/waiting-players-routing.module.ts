import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaitingPlayersPage } from './waiting-players.page';

const routes: Routes = [
  {
    path: '',
    component: WaitingPlayersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitingPlayersPageRoutingModule {}
