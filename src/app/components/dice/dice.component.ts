import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
})
export class DiceComponent implements OnInit {

  img: string;
  click: boolean;

  constructor() { }

  ngOnInit() {
    this.click = false;
  }

  rollDice(){
    const num = Math.floor(Math.random() * 6) + 1;
    this.click = true;
    this.img = '../../../assets/dice/dice'+ num +'.png';
  }

}
