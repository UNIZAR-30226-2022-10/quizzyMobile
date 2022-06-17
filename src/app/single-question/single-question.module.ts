import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleQuestionPageRoutingModule } from './single-question-routing.module';

import { SingleQuestionPage } from './single-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleQuestionPageRoutingModule
  ],
  declarations: [SingleQuestionPage]
})
export class SingleQuestionPageModule {}
