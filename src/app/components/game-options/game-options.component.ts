import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-game-options',
  templateUrl: './game-options.component.html',
  styleUrls: ['./game-options.component.scss'],
})
export class GameOptionsComponent implements OnInit {

  constructor(public router: Router, public viewCtrl: PopoverController) { }
  birthday;
  difficulty=1;
  time = 15;

  questionOptions : {categories: Array<{name: string}>, difficulty: string, time: number} = {categories : [], difficulty : '', time: 15};
  myGroupItems1: Array<{ checked: boolean, text: string, value: string, img: string, api: string }> = [
    { checked: false, text: 'History', value: '0', img: 'assets/categorias/historia.png', api: 'History' }, 
    { checked: false, text: 'Art', value: '1', img: 'assets/categorias/arte.png', api: 'Art' }] 
  myGroupItems2: Array<{ checked: boolean, text: string, value: string, img: string, api: string }> = [
    { checked: false, text: 'Geography', value: '0', img: 'assets/categorias/geografia.png', api: 'Geography' },
    { checked: false, text: 'Science', value: '1', img: 'assets/categorias/ciencia.png', api: 'Science' }]
  myGroupItems3: Array<{ checked: boolean, text: string, value: string, img: string, api: string }> = [
    { checked: false, text: 'Entertain.', value: '0', img: 'assets/categorias/entretenimiento.png', api: 'Entertainment' },
    { checked: false, text: 'Sports', value: '1', img: 'assets/categorias/deportes.png', api: 'Sports' }
]

  ngOnInit() {}

  segmentChanged(event)
  {
    console.log(event.detail.value);
    this.difficulty=event.detail.value;
  }

  rangeChanged(event)
  {
    console.log(event.detail.value);
    this.time=event.detail.value;
  }

  categoryChanged1(value)
  {

    this.myGroupItems1[value].checked = !this.myGroupItems1[value].checked;
    
  }

  categoryChanged2(value)
  {

    this.myGroupItems2[value].checked = !this.myGroupItems2[value].checked;
    
  }

  categoryChanged3(value)
  {

    this.myGroupItems3[value].checked = !this.myGroupItems3[value].checked;
    
  }

  cat():boolean {
    /*console.log(this.myGroupItems[0].checked || this.myGroupItems[1].checked || 
      this.myGroupItems[2].checked || this.myGroupItems[3].checked ||
      this.myGroupItems[4].checked || this.myGroupItems[5].checked);*/
    return !(this.myGroupItems1[0].checked || this.myGroupItems1[1].checked || 
            this.myGroupItems2[0].checked || this.myGroupItems2[1].checked ||
            this.myGroupItems3[0].checked || this.myGroupItems3[1].checked)  
  }

  setOptions() {

    if (this.difficulty == 0){
      this.questionOptions.difficulty = 'easy';
    }
    else if (this.difficulty == 1){
      this.questionOptions.difficulty = 'medium';
    }
    else{
      this.questionOptions.difficulty = 'hard';
    }

    this.questionOptions.time = this.time;

    this.questionOptions.categories = [];
    this.myGroupItems1.forEach(e => {
      if(e.checked){
        this.questionOptions.categories.push({name: e.api});
      }
    });

    this.myGroupItems2.forEach(e => {
      if(e.checked){
        this.questionOptions.categories.push({name: e.api});
      }
    });

    this.myGroupItems3.forEach(e => {
      if(e.checked){
        this.questionOptions.categories.push({name: e.api});
      }
    });

    console.log(this.questionOptions);
    this.viewCtrl.dismiss();
    this.router.navigate(['/question'], {state: this.questionOptions});
  }

}
