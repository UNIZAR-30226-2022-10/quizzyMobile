import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';
import { fromEvent, tap, Observable, Subscription } from 'rxjs';
import { TrivialCell } from './trivial-cell';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Player } from './player';
import { ActivatedRoute } from '@angular/router';

class Game {

}

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  numPlayers: any;

  private app: PIXI.Application;

  private actors: Player[] = [];

  private cells = [];

  constructor(
    private screenOrientation: ScreenOrientation,
    private activatedRoute: ActivatedRoute
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
      antialias: true,
      resizeTo: window
    });
  }

  ngOnInit() {
    this.numPlayers = this.activatedRoute.snapshot.paramMap.get('numJugadores');

    let bg = PIXI.Sprite.from(
      '../../assets/tableroFinalCentroCompleto.png'
    );
    bg.width = window.innerWidth;
    bg.height = window.innerHeight;
    //console.log('BACK W: ', bg.width, 'APP: ', this.app.screen.width);
    //console.log('BACK H: ', bg.height, 'APP: ', this.app.screen.height);
    this.app.stage.addChild(bg);

    this.createArrayCells();

    console.log(this.cells[0].getx());
    const stitch = PIXI.Texture.from('../../assets/stitch.png');
    const cube = PIXI.Texture.from('../../assets/cube.png');
    for (let i = 0; i < this.numPlayers; i++) {
      if (i % 2 === 0) {
        this.actors.push(new Player(stitch, this.app));
      } else {
        this.actors.push(new Player(cube, this.app));
      }
      this.actors[i].movePlayer(this.cells[0].getx(), this.cells[0].gety());
    }

    this.initActors();

    // main game loop
    this.app.ticker.add(function() {
      // resize background
      bg.width = window.innerWidth;
      bg.height = window.innerHeight;
    });

    document.body.appendChild(this.app.view);
  }

  initActors() {
    // Call actor update method
    for (let i = 0; i < this.actors.length; i++) {
      const actor = this.actors[i];
      this.app.stage.addChild(actor);
    }

  }

  unlockOrientation() {
    this.screenOrientation.unlock();
  }

  destroy() {
    this.app.destroy();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  createArrayCells(){
    this.cells =[
      new TrivialCell( 0,this.app.screen.width/2.15,   this.app.screen.height/2.2), // 0
      new TrivialCell( 1,this.app.screen.width/2.15,   this.app.screen.height/4),
      new TrivialCell( 2,this.app.screen.width/2.15,   this.app.screen.height/5.5),
      new TrivialCell( 3,this.app.screen.width/2.15,   this.app.screen.height/10),
      new TrivialCell( 4,this.app.screen.width/1.6,    this.app.screen.height/2.9), //5
      new TrivialCell( 5,this.app.screen.width/1.45,   this.app.screen.height/3.2),
      new TrivialCell( 6,this.app.screen.width/1.3,    this.app.screen.height/3.5),
      new TrivialCell( 7,this.app.screen.width/1.6,    this.app.screen.height/1.9),
      new TrivialCell( 8,this.app.screen.width/1.45,   this.app.screen.height/1.8),
      new TrivialCell( 9,this.app.screen.width/1.3,    this.app.screen.height/1.65),
      new TrivialCell(10,this.app.screen.width/2.15,   this.app.screen.height/1.6), // 10
      new TrivialCell(11,this.app.screen.width/2.15,   this.app.screen.height/1.45),
      new TrivialCell(12,this.app.screen.width/2.15,   this.app.screen.height/1.3),
      new TrivialCell(13,this.app.screen.width/3.3,    this.app.screen.height/1.9),
      new TrivialCell(14,this.app.screen.width/4.2,    this.app.screen.height/1.8),
      new TrivialCell(15,this.app.screen.width/6.3,    this.app.screen.height/1.65), // 15
      new TrivialCell(16,this.app.screen.width/3.3,    this.app.screen.height/2.9),
      new TrivialCell(17,this.app.screen.width/4.2,    this.app.screen.height/3.2),
      new TrivialCell(18,this.app.screen.width/6.3,    this.app.screen.height/3.5),
      new TrivialCell(19,this.app.screen.width/2.15,                           0),
      new TrivialCell(20,this.app.screen.width/1.8,                            0), // 20
      new TrivialCell(21,this.app.screen.width/1.6,    this.app.screen.height/36),
      new TrivialCell(22,this.app.screen.width/1.45,   this.app.screen.height/19),
      new TrivialCell(23,this.app.screen.width/1.35,   this.app.screen.height/10),
      new TrivialCell(24,this.app.screen.width/1.25,   this.app.screen.height/7),
      new TrivialCell(25,this.app.screen.width/1.17,   this.app.screen.height/4.5), //25
      new TrivialCell(26,this.app.screen.width/1.13,   this.app.screen.height/3.3),
      new TrivialCell(27,this.app.screen.width/1.1,    this.app.screen.height/2.7),
      new TrivialCell(28,this.app.screen.width/1.1,    this.app.screen.height/2.3),
      new TrivialCell(29,this.app.screen.width/1.1,    this.app.screen.height/1.95),
      new TrivialCell(30,this.app.screen.width/1.13,   this.app.screen.height/1.75), // 30
      new TrivialCell(31,this.app.screen.width/1.17,   this.app.screen.height/1.5),
      new TrivialCell(32,this.app.screen.width/1.25,   this.app.screen.height/1.35),
      new TrivialCell(33,this.app.screen.width/1.35,   this.app.screen.height/1.28),
      new TrivialCell(34,this.app.screen.width/1.45,   this.app.screen.height/1.23),
      new TrivialCell(35,this.app.screen.width/1.6,    this.app.screen.height/1.18), // 35
      new TrivialCell(36,this.app.screen.width/1.8,    this.app.screen.height/1.15),
      new TrivialCell(37,this.app.screen.width/2.15,   this.app.screen.height/1.15),
      new TrivialCell(38,this.app.screen.width/2.7,    this.app.screen.height/1.15),
      new TrivialCell(39,this.app.screen.width/3.35,   this.app.screen.height/1.18),
      new TrivialCell(40,this.app.screen.width/4.2,    this.app.screen.height/1.23), // 40
      new TrivialCell(41,this.app.screen.width/5.5,    this.app.screen.height/1.28),
      new TrivialCell(42,this.app.screen.width/7.7,    this.app.screen.height/1.35),
      new TrivialCell(43,this.app.screen.width/13,     this.app.screen.height/1.5),
      new TrivialCell(44,this.app.screen.width/27,     this.app.screen.height/1.75),
      new TrivialCell(45,this.app.screen.width/36,     this.app.screen.height/1.95), // 45
      new TrivialCell(46,                       0,     this.app.screen.height/2.3),
      new TrivialCell(47,this.app.screen.width/36,     this.app.screen.height/2.7),
      new TrivialCell(48,this.app.screen.width/27,     this.app.screen.height/3.3),
      new TrivialCell(49,this.app.screen.width/13,     this.app.screen.height/4.5),
      new TrivialCell(50,this.app.screen.width/7.7,    this.app.screen.height/7), // 50
      new TrivialCell(51,this.app.screen.width/5.5,    this.app.screen.height/10),
      new TrivialCell(52,this.app.screen.width/4.2,    this.app.screen.height/19),
      new TrivialCell(53,this.app.screen.width/3.35,   this.app.screen.height/36),
      new TrivialCell(54,this.app.screen.width/2.7,                            0),
    ];
  }

}
