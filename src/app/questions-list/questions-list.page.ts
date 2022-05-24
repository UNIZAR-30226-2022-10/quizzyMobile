import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { ValidateQuestionService } from '../validate-question/validate-question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.page.html',
  styleUrls: ['./questions-list.page.scss'],
})
export class QuestionsListPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll

  Question: any;

  /*question: Array<{ category: string, difficulty: string, nickname: string, question: string, correctAnswer: string, wrongAnswer1: string, wrongAnswer2: string, wrongAnswer3: string, id: number}> = [
    {category: 'History', difficulty: 'medium', nickname: 'Juan1', question:'pregunta', correctAnswer: 'La que está bien', wrongAnswer1: 'no le sabe', wrongAnswer2: 'no le vuelve a saber', wrongAnswer3: 'a ver si te la aprendes ya bobo', id: 1},
    {category: 'History', difficulty: 'medium', nickname: 'Juan2', question:'pregunta', correctAnswer: 'La que está bien', wrongAnswer1: 'no le sabe', wrongAnswer2: 'no le vuelve a saber', wrongAnswer3: 'a ver si te la aprendes ya bobo', id: 1},
    {category: 'History', difficulty: 'medium', nickname: 'Juan3', question:'pregunta', correctAnswer: 'La que está bien', wrongAnswer1: 'no le sabe', wrongAnswer2: 'no le vuelve a saber', wrongAnswer3: 'a ver si te la aprendes ya bobo', id: 1},
    {category: 'History', difficulty: 'medium', nickname: 'Juan4', question:'pregunta', correctAnswer: 'La que está bien', wrongAnswer1: 'no le sabe', wrongAnswer2: 'no le vuelve a saber', wrongAnswer3: 'a ver si te la aprendes ya bobo', id: 1},
    {category: 'History', difficulty: 'medium', nickname: 'Juan5', question:'pregunta', correctAnswer: 'La que está bien', wrongAnswer1: 'no le sabe', wrongAnswer2: 'no le vuelve a saber', wrongAnswer3: 'a ver si te la aprendes ya bobo', id: 1}
  ]*/

  constructor(private validateQuestionService: ValidateQuestionService, public router: Router) { }

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.Question = [];

    this.validateQuestionService.getPendingQuestions().then(e => {
      JSON.parse(JSON.stringify(e["questions"])).forEach(data => {
        this.Question.push(data);
      });
      console.log(this.Question);
    });
  }

  onClick(i) {
    this.router.navigate(['/validate-question'], {state: this.Question[i]});
  }

}
