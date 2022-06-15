import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainResumeComponent } from '../components/train-resume/train-resume.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Platform, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  questionOptions: any;

  questionAnswers: Array<{category: string, total: number, correct: number}>;

  respuesta:boolean=false;
  constructor(public location: Location, public http:HttpClient, public platform: Platform, public router: Router, private screenOrientation: ScreenOrientation, public popoverController: PopoverController) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
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
  categ: any;

  time : any;
  timeleft : any;

  timer: any;
  cancel:any;

  wild : Array<any>;
  iden : Array<any>;
  cant : Array<any>;
  buttons : Array<any>;

  position : any;

  ngOnInit() {
    this.categ = '';
    this.wild = [];
    this.cant = [];
    this.iden = [];
    this.questionAnswers = [];
    this.buttons = [];

    this.buttons.push(document.getElementById('res0'));
    this.buttons.push(document.getElementById('res1'));
    this.buttons.push(document.getElementById('res2'));
    this.buttons.push(document.getElementById('res3'));

    this.questionOptions = this.location.getState();
    //console.log(this.questionOptions);

    this.questionOptions.categories.forEach(e => {
      this.questionAnswers.push({category: e.name, total: 0, correct: 0});
    });

    this.getQuestion(this.questionOptions);

    this.time = this.questionOptions.time*10;
    this.timeleft = this.time;

    console.log(this.time, "TIEMPO BOBO");
    
    this.getUserWildcards().then(data => { 
      JSON.parse(JSON.stringify(data["wildcards"])).forEach(e => {
        this.wild.push(e.wname);
        this.iden.push(e.wildcard_id);
        this.cant.push(e.cuantity);
      }); 
    });

   // console.log(this.wild);

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
      this.questionAnswers.forEach(e => {
        if (e.category == this.categ){
          e.total++;
        }
      });
      this.time = this.questionOptions.time*10;
      this.timeleft = this.time;
      clearInterval(this.timer);
      clearInterval(this.cancel);
      this.getQuestion(this.questionOptions);
      this.Showprogress();
      console.log("Respuesta incorrecta");
      console.log(this.questionAnswers);      
    }
  }


  onClick(id) {
    if(this.answers[id].correct===true)
    {
      
      this.questionAnswers.forEach(e => {
        if (e.category == this.categ){
          e.total++;
          e.correct++;
        }
      });
      console.log("Respuesta correcta");
      console.log(this.questionAnswers);

      this.buttons[id].style.cssText = 'background-color: #2dd36f';
      

    }
    else
    {
      this.questionAnswers.forEach(e => {
        if (e.category == this.categ){
          e.total++;
          console.log(e.category, this.categ);
        }
      });
      console.log("Respuesta incorrecta");
      console.log(this.questionAnswers);

      this.buttons[id].style.cssText = 'background-color: #eb445a';
      this.buttons[this.position].style.cssText = 'background-color: #2dd36f';

    }

    this.disable = [true,true,true,true];
    clearInterval(this.timer);
    clearInterval(this.cancel);

    let timeout = setTimeout(() => {

      for(var i = 0; i < this.answers.length; i++){
        this.buttons[i].style.cssText = 'background-color: #112d4e';
      }

      this.time = this.questionOptions.time*10;
      this.timeleft = this.time;
      clearTimeout(timeout);
      this.getQuestion(this.questionOptions);
      this.Showprogress();
    }, 500);
    
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
        this.categ = questionOptions.categories[num | 0].name;

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

      this.timeleft = this.timeleft + 150;
      this.time = this.time + 150;

      this.cancel = setInterval(() => clearInterval(this.timer), this.timeleft*100);
    }
    this.wildcardUse = true;
  }

  comodines(array_id){
    return !(this.cant[array_id] > 0 && !this.wildcardUse);
  }

  async finishTrain(){

    clearInterval(this.timer);
    clearInterval(this.cancel);    

    const popover = await this.popoverController.create({
      component: TrainResumeComponent,
      componentProps: {answers: this.questionAnswers}
    });
  
    await popover.present();
  }

}
