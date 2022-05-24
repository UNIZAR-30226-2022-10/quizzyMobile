import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  questionOptions:any;

  respuesta:boolean=false;
  constructor(public location: Location, public http:HttpClient, public platform: Platform, public router: Router, private screenOrientation: ScreenOrientation) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.platform.backButton.subscribeWithPriority(100, () => {
      this.screenOrientation.unlock();
      clearInterval(this.timer);
      clearInterval(this.cancel);
      this.router.navigate(['/initial-menu']);
    });
  }
  
  disable : Array<boolean> = [
    false,
    false,
    false,
    false
  ]

  quest="Tú como le dise rotten o rotten???"
  answers: Array<{correct: boolean, text:string}> = [
    { correct: true, text: 'Answer 1'},
    { correct: false, text: 'Answer 2'},
    { correct: false, text: 'Answer 3'},
    { correct: false, text: 'Answer 4'}
  ]

  wildcardUse : boolean;


  time = 150;
  timeleft = 150;

  timer: any;
  cancel:any;

  wild : Array<any>;
  iden : Array<any>;
  cant : Array<any>;

  position : any;

  ngOnInit() {

    this.wild = [];
    this.cant = [];
    this.iden = [];

    this.questionOptions = this.location.getState();
    console.log(this.questionOptions);

    this.getQuestion(this.questionOptions);

    this.getUserWildcards().then(data => { 
      JSON.parse(JSON.stringify(data["wildcards"])).forEach(e => {
        this.wild.push(e.wname);
        this.iden.push(e.wildcard_id);
        this.cant.push(e.cuantity);
      }); 
    });

    console.log(this.wild);

    this.Showprogress();
  } 


    showLoader: boolean;
    p_bar_value: number;
  
  Showprogress()  
  {   
    this.timer = setInterval(() => this.ProgressBar(), 100);
    this.cancel = setInterval(() => clearInterval(this.timer), this.time*100);
  }

  ProgressBar() {
    this.p_bar_value = (this.timeleft/this.time);
    this.timeleft = this.timeleft-1; 
    if(this.timeleft==0)
    {
      this.time = 150;
      this.timeleft = 150;
      clearInterval(this.timer);
      clearInterval(this.cancel);
      this.getQuestion(this.questionOptions);
      this.Showprogress();
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

    this.time = 150;
    this.timeleft = 150;
    clearInterval(this.timer);
    clearInterval(this.cancel);
    this.getQuestion(this.questionOptions);
    this.Showprogress();
  }


  getQuestion(questionOptions){
    const url = 'http://quizzyappbackend.herokuapp.com/questions';
    
    let params = new HttpParams();
    let num = Math.random() * questionOptions.categories.length;

    params = params.append('difficulty', questionOptions.difficulty);
    params = params.append('category', questionOptions.categories[num | 0].name);
    params = params.append('limit', 1);

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'aplication/json'});
    let options = { headers : headers, params : params};
    
    return new Promise(resolve => {
      this.http.get(url,options).subscribe(data => {
        resolve(data);
        let question = data["questions"][0];

        this.quest = question.question;

        this.position = (Math.random() * 4) | 0;
        console.log(this.position);

        this.answers[this.position] = {text: question.correct_answer, correct: true};
        this.answers[(this.position + 1) % 4] = {text: question.wrong_answer_1, correct: false};
        this.answers[(this.position + 2) % 4] = {text: question.wrong_answer_2, correct: false};
        this.answers[(this.position + 3) % 4] = {text: question.wrong_answer_3, correct: false};

        this.disable = [false, false, false, false];
      
        this.wildcardUse = false;
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
   wildcardUseApi(){
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

  useWildcard(wildcard_id){

    if(wildcard_id == 1){ //  50/50

      this.cant[1]--;
      console.log("50 TO 50", this.position);

      this.disable[(this.position + 3) % 4] = true;
      this.disable[(this.position + 5) % 4] = true;
    }
    else{
      this.cant[0]--;
      clearInterval(this.cancel);

      this.timeleft = this.timeleft + 150;
      this.time = this.time + 150;

      this.cancel = setInterval(() => clearInterval(this.timer), this.timeleft*100);
    }
    this.wildcardUse = true;
  }

  comodines(id){
    return !(this.cant[id] > 0 && !this.wildcardUse);
  }

}
