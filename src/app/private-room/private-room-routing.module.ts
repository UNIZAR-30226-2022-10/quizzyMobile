import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivateRoomPage } from './private-room.page';

const routes: Routes = [
  {
    path: '',
    component: PrivateRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoomPageRoutingModule {}
