import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListFriendsPage } from './list-friends.page';

const routes: Routes = [
  {
    path: '',
    component: ListFriendsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListFriendsPageRoutingModule {}
