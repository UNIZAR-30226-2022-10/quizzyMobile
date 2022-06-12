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
  constructor() {
    const receiveNum = window.localStorage.getItem('Board');
    this.num  = JSON.parse(receiveNum);
   }

  ngOnInit() {
    this.click = false;
  }

  rollDice(){
    this.click = true;
    this.img = '../../../assets/dice/dice'+ this.num +'.png';

    window.localStorage.setItem('Dice', JSON.stringify(this.click));
    console.log("ENVIADO");
  }

}
