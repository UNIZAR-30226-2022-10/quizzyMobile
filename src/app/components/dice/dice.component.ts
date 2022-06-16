import { Component, OnInit, Input } from '@angular/core';
import { BoardService } from 'src/app/board/board.service';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
})
export class DiceComponent implements OnInit {

  img: string;
  click: boolean;
  num: any;
  timeout: any;
  constructor(public boardService: BoardService) {
    this.num  = localStorage.getItem('Board');
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

    this.boardService.showMovement();

  }

}
