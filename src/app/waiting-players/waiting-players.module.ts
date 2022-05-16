import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitingPlayersPageRoutingModule } from './waiting-players-routing.module';

import { WaitingPlayersPage } from './waiting-players.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaitingPlayersPageRoutingModule
  ],
  declarations: [WaitingPlayersPage]
})
export class WaitingPlayersPageModule {}
