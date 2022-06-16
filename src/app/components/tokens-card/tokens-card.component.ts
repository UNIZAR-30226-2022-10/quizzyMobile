import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tokens-card',
  templateUrl: './tokens-card.component.html',
  styleUrls: ['./tokens-card.component.scss'],
})
export class TokensCardComponent implements OnInit {

  player={
    name:'Juan',
    skin: '10'
  }

  @Input("tokens") tokens;

  tokenList : Array<String> = [
    'historia',
    'arte',
    'geografia',
    'ciencia',
    'entretenimiento',
    'deportes'
  ]

  constructor() { }

  ngOnInit() {

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
