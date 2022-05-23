import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuggestService } from './suggest.service';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.page.html',
  styleUrls: ['./suggest.page.scss'],
})
export class SuggestPage implements OnInit {

  constructor(public router: Router, private suggestService: SuggestService) { }

  suggestion = {
    question: '',
    category: '',
    difficulty: '',
    correctAnswer: '',
    wrongAnswer1: '',
    wrongAnswer2: '',
    wrongAnswer3: ''
  };

  ngOnInit() {
  }

  category(event) {
    this.suggestion.category=event.detail.value;
  }

  difficulty(event) {
    this.suggestion.difficulty=event.detail.value;
  }

  opc():boolean {
    return (this.suggestion.difficulty=='') || (this.suggestion.category=='')
  }

  onSubmit() {
    this.suggestService.suggestQuestion(this.suggestion.question, this.suggestion.category,
      this.suggestion.difficulty, this.suggestion.correctAnswer, this.suggestion.wrongAnswer1, 
      this.suggestion.wrongAnswer2, this.suggestion.wrongAnswer3)
    this.router.navigate(['/initial-menu'])
  }

}
