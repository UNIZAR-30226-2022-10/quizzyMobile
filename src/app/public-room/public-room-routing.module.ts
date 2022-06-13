import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicRoomPage } from './public-room.page';

const routes: Routes = [
  {
    path: '',
    component: PublicRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoomPageRoutingModule {}
