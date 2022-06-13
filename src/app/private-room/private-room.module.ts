import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivateRoomPageRoutingModule } from './private-room-routing.module';

import { PrivateRoomPage } from './private-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivateRoomPageRoutingModule
  ],
  declarations: [PrivateRoomPage]
})
export class PrivateRoomPageModule {}
