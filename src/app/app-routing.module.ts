import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

var destiny = 'home';

if ( localStorage.getItem("token") ){
    destiny = 'initial-menu';
}

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: destiny,
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'initial-menu',
    loadChildren: () => import('./initial-menu/initial-menu.module').then( m => m.InitialMenuPageModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then( m => m.ShopPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'board/:numJugadores/:rid',
    loadChildren: () => import('./board/board.module').then( m => m.BoardPageModule)
  },
  {
    path: 'suggest',
    loadChildren: () => import('./suggest/suggest.module').then( m => m.SuggestPageModule)
  },
  {
    path: 'waiting-players',
    loadChildren: () => import('./waiting-players/waiting-players.module').then( m => m.WaitingPlayersPageModule)
  },
  {
    path: 'questions-list',
    loadChildren: () => import('./questions-list/questions-list.module').then( m => m.QuestionsListPageModule)
  },
  {
    path: 'question',
    loadChildren: () => import('./question/question.module').then( m => m.QuestionPageModule)
  },
  {
    path: 'validate-question',
    loadChildren: () => import('./validate-question/validate-question.module').then( m => m.ValidateQuestionPageModule)
  },
  {
    path: 'friends',
    loadChildren: () => import('./friends/friends.module').then( m => m.FriendsPageModule)
  },
  {
    path: 'list-friends',
    loadChildren: () => import('./list-friends/list-friends.module').then( m => m.ListFriendsPageModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./request/request.module').then( m => m.RequestPageModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then( m => m.InventoryPageModule)
  },
  {
    path: 'public-room',
    loadChildren: () => import('./public-room/public-room.module').then( m => m.PublicRoomPageModule)
  },
  {
    path: 'private-room',
    loadChildren: () => import('./private-room/private-room.module').then( m => m.PrivateRoomPageModule)
  },
  {
    path: 'invite-friend',
    loadChildren: () => import('./invite-friend/invite-friend.module').then( m => m.InviteFriendPageModule)
  },
  {
    path: 'single-question',
    loadChildren: () => import('./single-question/single-question.module').then( m => m.SingleQuestionPageModule)
  },








];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
