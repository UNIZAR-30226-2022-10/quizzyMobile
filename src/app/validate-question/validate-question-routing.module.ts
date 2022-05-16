import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidateQuestionPage } from './validate-question.page';

const routes: Routes = [
  {
    path: '',
    component: ValidateQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidateQuestionPageRoutingModule {}
