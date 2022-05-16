import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import {InitialMenuPageRoutingModule } from './initial-menu-routing.module';

import { InitialMenuPage } from './initial-menu.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InitialMenuPageRoutingModule,
    ComponentsModule
  ],
  declarations: [InitialMenuPage]
})
export class InitialMenuPageModule {}
