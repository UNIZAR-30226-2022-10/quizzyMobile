import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainResumeComponent } from '../components/train-resume/train-resume.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Platform, PopoverController } from '@ionic/angular';
import { WebSocketProvider } from '../web-socket.service';
import { BoardService } from '../board/board.service';

@Component({
  selector: 'app-single-question',
  templateUrl: './single-question.page.html',
  styleUrls: ['./single-question.page.scss'],
})
export class SingleQuestionPage implements OnInit {

  questionOptions: any;

  respuesta=false;

  disable: Array<boolean> = [
    false,
    false,
    false,
    false
  ];

  quest="Tú como le dise rotten o rotten???";
  answers: Array<{correct: boolean, text:string}> = [
    { correct: true, text: 'Answer 1'},
    { correct: false, text: 'Answer 2'},
    { correct: false, text: 'Answer 3'},
    { correct: false, text: 'Answer 4'}
  ];

  wildcardUse: boolean;
  categ: any;

  time: any;
  timeleft: any;

  timer: any;
  cancel: any;

  wild: Array<any>;
  iden: Array<any>;
  cant: Array<any>;
  buttons: Array<any>;

  position: any;

  numPlayers: any;
  rid: any;
  cat: number;


  constructor(public webSocket: WebSocketProvider,public location: Location, public http:HttpClient, public platform: Platform, public router: Router, private screenOrientation: ScreenOrientation, public popoverController: PopoverController, private activatedRoute: ActivatedRoute, private boardService: BoardService) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  ngOnInit() {
    this.categ = '';
    this.wild = [];
    this.cant = [];
    this.iden = [];
    this.buttons = [];

    this.buttons.push(document.getElementById('res0'));
    this.buttons.push(document.getElementById('res1'));
    this.buttons.push(document.getElementById('res2'));
    this.buttons.push(document.getElementById('res3'));

    this.questionOptions = this.location.getState();
    console.log(this.questionOptions);

    if(this.questionOptions.timeout){
      this.time = this.questionOptions.timeout;
    }
    else{
      this.time = 15000;
    }

    if(this.questionOptions.wildcardsUse == false){
      this.wildcardUse = true;
    }
    else{
      this.wildcardUse = false;
    }
    
    this.timeleft = this.time;

    this.position = (Math.random() * 4) | 0;

    this.quest = this.questionOptions.question.question;
    this.answers[this.position] = {text: this.questionOptions.question.correct_answer, correct: true};
    this.answers[(this.position + 1) % 4] = {text: this.questionOptions.question.wrong_answer_1, correct: false};
    this.answers[(this.position + 2) % 4] = {text: this.questionOptions.question.wrong_answer_2, correct: false};
    this.answers[(this.position + 3) % 4] = {text: this.questionOptions.question.wrong_answer_3, correct: false};


    console.log(this.time, "TIEMPO BOBO");
    
    this.getUserWildcards().then(data => { 
      JSON.parse(JSON.stringify(data["wildcards"])).forEach(e => {
        this.wild.push(e.wname);
        this.iden.push(e.wildcard_id);
        this.cant.push(e.cuantity);
      }); 
    });

   // console.log(this.wild);

    this.showProgress();
  }


    showLoader: boolean;
    p_bar_value: number;

  showProgress()
  {
    this.timer = setInterval(() => this.progressBar(), 100);
    this.cancel = setInterval(() => clearInterval(this.timer), this.time);
  }

  progressBar() {
    this.p_bar_value = (this.timeleft/this.time);
    this.timeleft = this.timeleft-100;
    if(this.timeleft==0)
    {
      this.time = this.questionOptions.timeout;
      this.timeleft = this.time;
      clearInterval(this.timer);
      clearInterval(this.cancel);
      this.showProgress();
      console.log("Respuesta incorrecta");

      let timeout = setTimeout(() => {
        clearTimeout(timeout);
        clearInterval(this.timer);
        clearInterval(this.cancel);
        this.location.back();
      }, 500);
    }
  }


  onClick(id) {
    this.disable = [true,true,true,true];
    clearInterval(this.timer);
    clearInterval(this.cancel);

    if(this.answers[id].correct===true)
    {

      this.buttons[id].style.cssText = 'background-color: #2dd36f';
    
      //  Socket ok
      // console.log(this.webSocket);
       this.webSocket.answerQuestion(this.answers[id].text, this.questionOptions.pub, (data) => {
         console.log("CALLBACK CLICK: ", data);
         this.boardService.setRoll(data.roll);
         if(data.ok){
          this.boardService.showDice();
         }
         
       });

    }
    else
    {

      this.buttons[id].style.cssText = 'background-color: #eb445a';
      this.buttons[this.position].style.cssText = 'background-color: #2dd36f';

       this.webSocket.answerQuestion(this.answers[id].text,this.questionOptions.pub, (data) => {
         console.log("CALLBACK CLICK",data);
       });

    }

    

    let timeout = setTimeout(() => {
      clearTimeout(timeout);
      clearInterval(this.timer);
      clearInterval(this.cancel);
      this.location.back();
    }, 500);
    
  }


  /**
   * Function that returns all the wildcards on the API
   *
   * @returns All the wildcards
   */
   getUserWildcards(){
    const url = 'http://quizzyappbackend.herokuapp.com/user/wildcards';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`});
    let options = { headers : headers};
    return new Promise(resolve => {
      this.http.get(url,options).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  }

  /**
   * Function that returns all the wildcards on the API
   *
   * @returns All the wildcards
   */
   wildcardUseApi(id){
    const url = 'http://quizzyappbackend.herokuapp.com/user/use';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`});
      let params = new HttpParams()
      .set('id', id)
    let options = { headers : headers, params: params};
    return new Promise(resolve => {
      this.http.put(url, {}, options).subscribe(data => {
        console.log(data);
        resolve(data);
      }, error => {
        console.log(error);
      });
    });
  }

  useWildcard(array_id, wildcard_id){

    if(wildcard_id == 1){ //  50/50

      this.cant[array_id]--;
      console.log("50 TO 50", this.position);
      this.wildcardUseApi(wildcard_id);
      this.disable[(this.position + 3) % 4] = true;
      this.disable[(this.position + 5) % 4] = true;

      this.buttons[(this.position + 3) % 4].style.cssText = 'background-color: #828c9c';
      this.buttons[(this.position + 5) % 4].style.cssText = 'background-color: #828c9c';
    }
    else{
      this.cant[array_id]--;
      clearInterval(this.cancel);

      this.wildcardUseApi(wildcard_id);

      this.webSocket.wildcardTime();
      this.timeleft = this.timeleft + 15000;
      this.time = this.time + 15000;
  
      this.cancel = setInterval(() => clearInterval(this.timer), this.timeleft);
    }
    this.wildcardUse = true;
  }

  comodines(array_id){
    return !(this.cant[array_id] > 0 && !this.wildcardUse);
  }

  back(){
  }
}
