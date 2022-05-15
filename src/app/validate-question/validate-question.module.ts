import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidateQuestionPageRoutingModule } from './validate-question-routing.module';

import { ValidateQuestionPage } from './validate-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidateQuestionPageRoutingModule
  ],
  declarations: [ValidateQuestionPage]
})
export class ValidateQuestionPageModule {}
