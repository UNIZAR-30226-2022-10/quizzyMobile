import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionsListPageRoutingModule } from './questions-list-routing.module';

import { QuestionsListPage } from './questions-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionsListPageRoutingModule
  ],
  declarations: [QuestionsListPage]
})
export class QuestionsListPageModule {}
