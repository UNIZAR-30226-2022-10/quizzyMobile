import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestPageRoutingModule } from './suggest-routing.module';

import { SuggestPage } from './suggest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuggestPageRoutingModule
  ],
  declarations: [SuggestPage]
})
export class SuggestPageModule {}
