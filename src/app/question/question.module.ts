import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionPageRoutingModule } from './question-routing.module';

import { QuestionPage } from './question.page';
//import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionPageRoutingModule,
   // MatProgressBarModule,
    ComponentsModule
  ],
  declarations: [QuestionPage]
})
export class QuestionPageModule {}
