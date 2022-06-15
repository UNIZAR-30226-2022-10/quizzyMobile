import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
})
export class DiceComponent implements OnInit {

  img: string;
  click: boolean;
  num: number;
  timeout: any;
  constructor() {
    const receiveNum = window.localStorage.getItem('Board');
    this.num  = JSON.parse(receiveNum);
   }

  ngOnInit() {
    this.click = false;
    this.timeout = setTimeout( () => {
      this.rollDice();
    },2000);
  }

  rollDice(){
    clearTimeout(this.timeout);

    this.img = '../../../assets/dice/dice'+ this.num +'.png';
  }

}
