import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.page.html',
  styleUrls: ['./suggest.page.scss'],
})
export class SuggestPage implements OnInit {

  constructor(public router: Router) { }

  suggestion = {
    question: 'Pregunta',
    category: '',
    difficulty: '',
    correctAnswer: '',
    wrongAnswer1: '',
    wrongAnswer2: '',
    wrongAnswer3: '',
    nickname: ''
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
    this.router.navigate(['/initial-menu'])
  }

}
