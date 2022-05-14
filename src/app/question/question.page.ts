import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  respuesta:boolean=false;
  constructor() { }
  quest="Tú como le dise rotten o rotten???"
  answers: Array<{correct: boolean, text:string}> = [
    { correct: true, text: 'Answer 1'},
    { correct: false, text: 'Answer 2'},
    { correct: false, text: 'Answer 3'},
    { correct: false, text: 'Answer 4'}
  ]
  partida = 15;
  time = this.partida;
  timeleft = this.partida; 
  ngOnInit() {
    this.Showprogress();
  } 
  progress = 100;  
 Showprogress()  
 {  
   this.progress = 100;  
   var downloadTimer = setInterval(() => this.ProgressBar(), 100);
   setInterval(() => clearInterval(downloadTimer), this.partida*1000 + 100);
   }  
  
 ProgressBar() {
   this.progress = 100*(this.timeleft/this.time);
   this.timeleft = this.timeleft-0.1; 
   if(this.timeleft==0)
   {
     this.respuesta=true;
   } 
 }

  onClick(id) {
    if(this.answers[id].correct===true)
    {
      console.log("Respuesta correcta");
    }
    else
    {
      console.log("Respuesta incorrecta");
    }
    this.timeleft=0;
    this.respuesta=true;
  }

}
