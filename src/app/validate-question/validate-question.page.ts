import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateQuestionService } from './validate-question.service';

@Component({
  selector: 'app-validate-question',
  templateUrl: './validate-question.page.html',
  styleUrls: ['./validate-question.page.scss'],
})
export class ValidateQuestionPage implements OnInit {

  constructor(public router: Router, private validateQuestionService:ValidateQuestionService) { }

  suggestion = {
    question: 'Pregunta',
    category: 'History',
    difficulty: 'medium',
    correctAnswer: 'Correcta',
    wrongAnswer1: 'Mal 1',
    wrongAnswer2: 'Mal 2',
    wrongAnswer3: 'Mal 3',
    nickname: '',
    id: ''
  };

  ngOnInit() {
    this.suggestion.nickname=this.router.getCurrentNavigation().extras.state.nickname;
    this.suggestion.category=this.router.getCurrentNavigation().extras.state.category_name;
    this.suggestion.difficulty=this.router.getCurrentNavigation().extras.state.difficulty;
    this.suggestion.question=this.router.getCurrentNavigation().extras.state.question;
    this.suggestion.correctAnswer=this.router.getCurrentNavigation().extras.state.correct_answer;
    this.suggestion.wrongAnswer1=this.router.getCurrentNavigation().extras.state.wrong_answer_1;
    this.suggestion.wrongAnswer2=this.router.getCurrentNavigation().extras.state.wrong_answer_2;
    this.suggestion.wrongAnswer3=this.router.getCurrentNavigation().extras.state.wrong_answer_3;
    this.suggestion.id=this.router.getCurrentNavigation().extras.state.question_id;
  }

  accept() {
    console.log(this.suggestion.id)
    this.validateQuestionService.acceptQuestion(this.suggestion.id)
    this.router.navigate(['/questions-list'])
  }

  decline() {
    console.log(this.suggestion.id)
    this.validateQuestionService.declineQuestion(this.suggestion.id)
    this.router.navigate(['/questions-list'])
  }

}
