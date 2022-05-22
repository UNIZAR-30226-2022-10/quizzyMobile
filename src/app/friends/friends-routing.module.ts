import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FriendsPage } from './friends.page';

const routes: Routes = [
  {
    path: '',
    component: FriendsPage,
    children: [
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then(m => m.SearchPageModule)
      },
      {
        path: 'list-friends',
        loadChildren: () => import('../list-friends/list-friends.module').then(m => m.ListFriendsPageModule)
      },
      {
        path: 'request',
        loadChildren: () => import('../request/request.module').then(m => m.RequestPageModule)
      },
      {
        path: '',
        redirectTo: '/friends/search',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendsPageRoutingModule {}
