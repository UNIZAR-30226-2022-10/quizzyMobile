import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleQuestionPage } from './single-question.page';

const routes: Routes = [
  {
    path: '',
    component: SingleQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleQuestionPageRoutingModule {}
