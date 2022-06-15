import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tokens-card',
  templateUrl: './tokens-card.component.html',
  styleUrls: ['./tokens-card.component.scss'],
})
export class TokensCardComponent implements OnInit {

  player: any;

  tokens: Array<string>;

  tokenList: Array<string> = [
    'historia',
    'arte',
    'geografia',
    'ciencia',
    'entretenimiento',
    'deportes'
  ];

  constructor() { }

  ngOnInit() {
    console.log("PERO");
    this.player = JSON.parse(localStorage.getItem('id'));
    console.log("LO QUE RECIBO: ", this.player);
    this.tokens = JSON.parse(localStorage.getItem('tokens'));
  }

  getToken(id) {
    if(this.tokens.includes(this.tokenList[id]))
    {
      return "../../assets/categorias/" + this.tokenList[id] + ".png";
    }
    else
      return "../../assets/categorias/no_" + this.tokenList[id] + ".png"; 
  }

}
