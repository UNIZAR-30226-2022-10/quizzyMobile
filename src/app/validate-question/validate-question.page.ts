import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validate-question',
  templateUrl: './validate-question.page.html',
  styleUrls: ['./validate-question.page.scss'],
})
export class ValidateQuestionPage implements OnInit {

  constructor(public router: Router) { }

  suggestion = {
    question: 'Pregunta',
    category: 'History',
    difficulty: 'medium',
    correctAnswer: 'Correcta',
    wrongAnswer1: 'Mal 1',
    wrongAnswer2: 'Mal 2',
    wrongAnswer3: 'Mal 3',
    nickname: ''
  };

  ngOnInit() {
  }

  accept() {
    this.router.navigate(['/questions-list'])
  }

  decline() {
    this.router.navigate(['/questions-list'])
  }

}
