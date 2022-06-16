import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
})
export class DiceComponent implements OnInit {

  img: string;
  click: boolean;

  timeout: any;
 @Input("num") num;

  constructor(public popoverController: PopoverController) {}

  ngOnInit() {
    this.click = false;
    this.timeout = setTimeout( () => {
      this.rollDice();
    },2000);
  }

  rollDice(){
    clearTimeout(this.timeout);

    this.img = '../../../assets/dice/dice'+ this.num +'.png';
    this.click = true;

    this.timeout = setTimeout( () => {
      this.popoverController.dismiss();
    },1000);
  }

}
