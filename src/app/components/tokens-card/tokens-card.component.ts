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
    'geografia',
    'arte',
    'historia',
    'ciencia',
    'deportes',
    'entretenimiento'
  ]

  constructor() { }

  ngOnInit() {

  }

  getToken(id) {
    if(this.tokens[id])
    {
      return "../../assets/categorias/" + this.tokenList[id] + ".png";
    }
    else
      return "../../assets/categorias/no_" + this.tokenList[id] + ".png"; 
  }

}
