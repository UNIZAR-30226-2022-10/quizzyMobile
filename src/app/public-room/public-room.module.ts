import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicRoomPageRoutingModule } from './public-room-routing.module';

import { PublicRoomPage } from './public-room.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicRoomPageRoutingModule
  ],
  declarations: [PublicRoomPage]
})
export class PublicRoomPageModule {}
