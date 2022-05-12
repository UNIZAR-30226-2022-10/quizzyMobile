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
    correctAnswer: '',
    wrongAnswer1: '',
    wrongAnswer2: '',
    wrongAnswer3: ''
  };

  ngOnInit() {
  }

  onSubmit() {
    this.router.navigate(['/initial-menu'])
  }

}
