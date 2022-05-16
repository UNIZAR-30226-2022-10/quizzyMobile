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

  questionOptions : {categories: Array<{name: string}>, difficulty: string} = {categories : [], difficulty : ''};
  myGroupItems: Array<{ checked: boolean, text: string, value: string, img: string, api: string }> = [
    { checked: false, text: 'Historia', value: '0', img: 'assets/categorias/historia.png', api: 'History' }, 
    { checked: false, text: 'Arte', value: '1', img: 'assets/categorias/arte.png', api: 'Art' }, 
    { checked: false, text: 'Geografía', value: '2', img: 'assets/categorias/geografia.png', api: 'Geography' },
    { checked: false, text: 'Ciencia', value: '3', img: 'assets/categorias/ciencia.png', api: 'Science' },
    { checked: false, text: 'Entreten.', value: '4', img: 'assets/categorias/entretenimiento.png', api: 'Entertainment' },
    { checked: false, text: 'Deportes', value: '5', img: 'assets/categorias/deportes.png', api: 'Sports' }
]

  ngOnInit() {}

  segmentChanged(event)
  {
    console.log(event.detail.value);
    this.difficulty=event.detail.value;
  }

  categoryChanged(value)
  {

    this.myGroupItems[value].checked = !this.myGroupItems[value].checked;
    
  }

  cat():boolean {
    /*console.log(this.myGroupItems[0].checked || this.myGroupItems[1].checked || 
      this.myGroupItems[2].checked || this.myGroupItems[3].checked ||
      this.myGroupItems[4].checked || this.myGroupItems[5].checked);*/
    return !(this.myGroupItems[0].checked || this.myGroupItems[1].checked || 
            this.myGroupItems[2].checked || this.myGroupItems[3].checked ||
            this.myGroupItems[4].checked || this.myGroupItems[5].checked)  
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

    this.questionOptions.categories = [];
    this.myGroupItems.forEach(e => {
      if(e.checked){
        this.questionOptions.categories.push({name: e.api});
      }
    });

    console.log(this.questionOptions);
    this.viewCtrl.dismiss();
    this.router.navigate(['/question'], {state: this.questionOptions});
  }

}
